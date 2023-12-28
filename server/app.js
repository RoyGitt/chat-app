import express from "express";
import dotenv from "dotenv";
import { chats } from "./mockData.js";

dotenv.config();
const app = express();

app.get("/api", (req, res) => {
  res.status(200).json({ message: "test" });
});

app.get("/api/chats", (req, res) => {
  res.status(200).json(chats);
});

app.get("/api/chats/:id", (req, res) => {
  const id = req.params.id;
  const filteredData = chats.find((chat) => chat._id === id);
  res.status(200).json(filteredData);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
