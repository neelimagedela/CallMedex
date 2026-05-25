require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CallMedex server is running",
  });
});

// Auth Routes
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
