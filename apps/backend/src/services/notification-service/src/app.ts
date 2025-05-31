import express from "express";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes";
import { startUserRegisteredConsumer } from "./events/consumers/userConsumer";
import { connectQueue } from "./events/connection";
// import dotenv from 'dotenv';
// import path from 'path'

// dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", emailRoutes);

// Health Check Route
app.get("/health", (req: any, res: any) =>
  res.send("Notification Service running 🚀")
);
async function connectQ() {
  // Connect to the queue
  await connectQueue();
  console.log("Queue connected - Notification Service");

  // Start the consumer
  await startUserRegisteredConsumer();
  console.log("User Registered Consumer started");
}
// Function to start the service
console.log("Starting Notification Service...");
connectQ();

// Start the server
const PORT = process.env.NOTIFICATION_SERVICE_PORT || 4003;
app.listen(PORT, () => {
  console.log(`Notification Service running on http://localhost:${PORT}/`);
});

// Start the service
export default app;
