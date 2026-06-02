require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const path = require("path");

const db = require("./config/db");

const authRoutes = require("./modules/auth/routes/auth.routes");
const profileRoutes = require("./modules/profile/routes/profile.routes");
const appointmentRoutes = require("./modules/appointment/routes/appointment.routes");
const homeServiceRoutes = require("./modules/homeService/routes/homeService.routes");
const pharmacyRoutes = require("./modules/pharmacy/routes/pharmacy.routes");
const consultancyHomeRoutes = require("./modules/consultancyHome/routes/consultancyHome.routes");
<<<<<<< Updated upstream
const walkInCentersRoutes = require("./modules/walkInCenters/routes/walkInCenters.routes");
=======
const clinicRoutes = require("./modules/clinic/routes/clinic.routes");
>>>>>>> Stashed changes
const errorMiddleware = require("./shared/middleware/error.middleware");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

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
app.use("/walk-in-centers", walkInCentersRoutes);
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

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/home-service", homeServiceRoutes);
app.use("/pharmacy", pharmacyRoutes);
app.use("/consultancy-home", consultancyHomeRoutes);
app.use("/clinic", clinicRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});