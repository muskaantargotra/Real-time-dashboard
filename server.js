import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { setupWebSocket } from "./ws.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// Start WebSocket
setupWebSocket(server);

// Basic route for testing
app.get("/", (req, res) => res.send("✅ Real-Time Analytics Backend Running"));

server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${process.env.PORT} (accessible on your network)`);
});
