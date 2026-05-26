require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const pool = require("./config/db");

const authRoutes = require("./modules/auth/routes/auth.routes");
const errorMiddleware = require("./shared/middleware/error.middleware");

const app = express();

app.use(cors({
    origin:true,
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

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

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
