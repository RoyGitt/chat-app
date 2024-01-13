import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/auth.route.js";

dotenv.config();

connectDb();
const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.status(200).json({ message: "test" });
});
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error!";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
