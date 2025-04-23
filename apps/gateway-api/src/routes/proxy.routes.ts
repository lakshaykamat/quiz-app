import { Router } from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
dotenv.config();
const router = Router();

// Auth Service
router.use(
  "/api/v1/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/auth": "" },
  })
);

router.use(
  "/api/v1/submission",
  createProxyMiddleware({
    target: process.env.SUBMISSION_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/submission": "" },
  })
);

// Notification Service
router.use(
  "/api/v1/notify",
  createProxyMiddleware({
    target: process.env.NOTIFY_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/notify": "" },
  })
);

// Quiz Service
router.use(
  "/api/v1/quiz",
  createProxyMiddleware({
    target: process.env.QUIZ_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/quiz": "" },
  })
);

export default router;
