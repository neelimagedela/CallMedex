require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs");

const db = require("./config/db");

const staffRoutes = require("./modules/staff/staff.routes");
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
const errorMiddleware = require("./shared/middleware/error.middleware");

const app = express();
const mouRoutes = require("./modules/mou/mou.routes");

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());


/* =========================
   UPLOADS / REPORT PDF FIX
   ========================= */

// This includes the folder where your PDF actually exists:
// D:\callmedex\CallMedex\uploads\reports
const uploadRoots = [
  path.join(__dirname, "../../uploads"), // project-root uploads
  path.join(__dirname, "../uploads"), // server/uploads
  path.join(process.cwd(), "uploads"), // current working directory/uploads
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
app.get("/uploads/reports/:filename", (req, res) => {
  const filename = req.params.filename;

  if (!filename || filename.includes("..") || !filename.endsWith(".pdf")) {
    return res.status(400).json({
      success: false,
      message: "Invalid report file name.",
    });
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
    searchedIn: uploadRoots.map((root) => path.join(root, "reports", filename)),
  });
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

app.use("/mou", mouRoutes);
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
      message: "disconnected",
    });
  }
});

/* =========================
   ROUTES
   ========================= */

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Upload roots:");
  uploadRoots.forEach((root) => console.log(root));
});