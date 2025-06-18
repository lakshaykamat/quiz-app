import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import proxyRoutes from "./routes/proxy.routes";

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL, // or your frontend
  credentials: true,              // ✅ allows cookies
}));

app.use(morgan("dev"));
//app.use(express.json());
app.use(compression());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Health check
app.get("/", (req:any, res:any) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

// Proxy routes
app.use("/", proxyRoutes);

const PORT = process.env.GATEWAY_PORT || 8000;

setTimeout(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Gateway running at http://localhost:${PORT}`);
  });
}, 6000); // wait 3 seconds to let other services boot
export default app;
