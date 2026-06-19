require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs");

const db = require("./config/db");

const staffRoutes = require("./modules/Staff/staff.routes");
const authRoutes = require("./modules/auth/routes/auth.routes");
const profileRoutes = require("./modules/profile/routes/profile.routes");
const appointmentRoutes = require("./modules/appointment/routes/appointment.routes");
const homeServiceRoutes = require("./modules/homeService/routes/homeService.routes");
const pharmacyRoutes = require("./modules/pharmacy/routes/pharmacy.routes");
const consultancyHomeRoutes = require("./modules/consultancyHome/routes/consultancyHome.routes");
const walkInCentersRoutes = require("./modules/walkInCenters/routes/walkInCenters.routes");
const clinicRoutes = require("./modules/clinic/routes/clinic.routes");
const teleConsultationRoutes = require("./modules/teleConsultation/routes/teleConsultation.routes");
const diagnosticPackageRoutes = require(
  "./modules/diagnosticPackage/routes/diagnosticPackage.routes"
);
const supervisorRoutes = require("./modules/supervisor/supervisor.routes");
const mouRoutes = require("./modules/mou/mou.routes");

const errorMiddleware = require("./shared/middleware/error.middleware");

const app = express();

app.set("trust proxy", 1);

/* =========================
   SECURITY
   ========================= */

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
);

/* =========================
   CORS FIX FOR PRODUCTION
   ========================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://callmedex-v1.vercel.app",
  "https://callmedex-v1-3gyrs96aa-neelimagedelas-projects.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("CORS Origin:", origin);

    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

/* =========================
   BODY PARSERS
   ========================= */

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());

/* =========================
   UPLOADS / REPORT PDF FIX
   ========================= */

const uploadRoots = [
  path.join(__dirname, "../../uploads"), // project-root/uploads
  path.join(__dirname, "../uploads"), // server/uploads
  path.join(process.cwd(), "uploads"), // current-working-directory/uploads
  path.join(__dirname, "uploads"), // server/src/uploads fallback
];

uploadRoots.forEach((root) => {
  const reportsFolder = path.join(root, "reports");

  if (!fs.existsSync(reportsFolder)) {
    fs.mkdirSync(reportsFolder, { recursive: true });
  }

  app.use(
    "/uploads",
    express.static(root, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".pdf")) {
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader("Content-Disposition", "inline");
        }
      },
    })
  );
});

// Manual route for both Home Service and Diagnostic Walk-in report PDFs
app.get("/uploads/reports/:filename", async (req, res, next) => {
  const filename = req.params.filename;

  if (!filename || filename.includes("..") || !filename.endsWith(".pdf")) {
    return res.status(400).json({
      success: false,
      message: "Invalid report file name.",
    });
  }

  try {
    const [reports] = await db.query(
      `SELECT id, booking_id, booking_type 
       FROM booking_reports 
       WHERE report_pdf LIKE ? 
       LIMIT 1`,
      [`%${filename}`]
    );

    let isCompleted = false;

    if (reports.length > 0) {
      const report = reports[0];
      let bookingStatus = "";

      if (report.booking_type === "home_service") {
        const [rows] = await db.query(
          `SELECT status 
           FROM home_service_bookings 
           WHERE id = ? 
           LIMIT 1`,
          [report.booking_id]
        );

        bookingStatus = rows[0]?.status || "";
      } else if (report.booking_type === "walkin") {
        const [rows] = await db.query(
          `SELECT status 
           FROM diagnostic_walkin_bookings 
           WHERE id = ? 
           LIMIT 1`,
          [report.booking_id]
        );

        bookingStatus = rows[0]?.status || "";
      } else if (report.booking_type === "scan") {
        const [rows] = await db.query(
          `SELECT status 
           FROM appointments 
           WHERE id = ? 
           LIMIT 1`,
          [report.booking_id]
        );

        bookingStatus = rows[0]?.status || "";
      }

      if (bookingStatus === "completed") {
        isCompleted = true;
      }
    }

    if (!isCompleted) {
      let token = null;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
      }

      let allowed = false;

      if (token) {
        try {
          const {
            verifyAccessToken,
          } = require("./modules/auth/services/token.service");

          const decoded = verifyAccessToken(token);

          if (
            ["staff", "organization", "admin", "supervisor"].includes(
              decoded.role
            )
          ) {
            allowed = true;
          }
        } catch (err) {
          // Invalid token. Keep allowed as false.
        }
      }

      if (!allowed) {
        return res.status(403).json({
          success: false,
          message:
            "Access denied. Report is not completed yet or you do not have permission to view it.",
        });
      }
    }

    for (const root of uploadRoots) {
      const filePath = path.join(root, "reports", filename);

      if (fs.existsSync(filePath)) {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline");
        return res.sendFile(filePath);
      }
    }

    return res.status(404).json({
      success: false,
      message: "Report PDF file not found on server.",
      searchedIn: uploadRoots.map((root) =>
        path.join(root, "reports", filename)
      ),
    });
  } catch (error) {
    next(error);
  }
});

// Debug route. You can remove this later.
app.get("/debug/uploads", (req, res) => {
  const result = uploadRoots.map((root) => {
    const reportsFolder = path.join(root, "reports");

    return {
      root,
      reportsFolder,
      reportsExists: fs.existsSync(reportsFolder),
      files: fs.existsSync(reportsFolder) ? fs.readdirSync(reportsFolder) : [],
    };
  });

  res.json(result);
});

/* =========================
   RATE LIMIT
   ========================= */

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests",
  },
});

app.use("/auth", authLimiter);

/* =========================
   HEALTH CHECK
   ========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CallMedex API is running",
  });
});

app.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1");

    res.status(200).json({
      success: true,
      message: "CallMedex server is running",
      database: "connected",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database disconnected",
    });
  }
});

/* =========================
   ROUTES
   ========================= */

app.use("/mou", mouRoutes);
app.use("/api/staff", staffRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/home-service", homeServiceRoutes);
app.use("/pharmacy", pharmacyRoutes);
app.use("/consultancy-home", consultancyHomeRoutes);
app.use("/walk-in-centers", walkInCentersRoutes);
app.use("/clinic", clinicRoutes);
app.use("/api/tele-consultation", teleConsultationRoutes);
app.use("/api/diagnostic-package", diagnosticPackageRoutes);
app.use("/api/supervisor", supervisorRoutes);

/* =========================
   ERROR HANDLER
   ========================= */

app.use(errorMiddleware);

/* =========================
   SERVER START
   ========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Upload roots:");
  uploadRoots.forEach((root) => console.log(root));
});
