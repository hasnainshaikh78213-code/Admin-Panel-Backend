import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);


// DB Connect
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ http://localhost:${PORT}`));
