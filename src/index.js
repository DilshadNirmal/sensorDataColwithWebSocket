import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { Server } from "socket.io";
import http from "http";

import connectDb from "../db/connectDb.js";
import {
    getAllSensorData,
  getLatestSensorData,
  insertSensorData,
} from "./controllers/sensorController.js";
import { watchSensorCollections } from "./controllers/watchController.js";

const app = express();
configDotenv();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173/", credentials: true } });

connectDb();

app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req,res) => res.json("hello"))
app.get("/api/sensor-values/create", insertSensorData);
app.get("/api/sensor-values/", (req, res) =>  getLatestSensorData(req, res, io));
app.get("/api/all-sensor-values/", (req, res) =>  getAllSensorData(req, res, io));

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

watchSensorCollections(io)

const PORT = process.env.PORT || 4030;
server.listen(PORT, () => {
  console.log(`express app running on http://localhost:${PORT}`);
});
