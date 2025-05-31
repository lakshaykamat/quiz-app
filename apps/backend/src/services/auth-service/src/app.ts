import express from "express";
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
import routes from "./routes/auth.routes";
import bodyParser from "body-parser";
import cors from "cors";
import { connectQueue } from "./events/connection";
import consumeQuizSubmissions from "./events/consumer/consumer";
// import path from 'path'

// dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const app = express();

// Middleware: Body Parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Routes
// Health check route
app.get("/health", (req: any, res: any) => res.send("Auth Service is running"));
app.use("/", routes);

async function connectQ() {
  // Connect to the queue
  await connectQueue();
  console.log("Queue connected - Auth Service");

  await consumeQuizSubmissions();
}
// Function to start the service

console.log("Starting Auth Service...");
connectQ();

// Start the server
const PORT = process.env.AUTH_SERVICE_PORT || 4001;
app.listen(PORT, () => {
  console.log(`Auth Service running on http://localhost:${PORT}`);
});

// Start the service
export default app;
