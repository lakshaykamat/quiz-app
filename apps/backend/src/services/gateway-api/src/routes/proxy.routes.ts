import { Router } from "express";
import dotenv from "dotenv"
import { createProxyMiddleware } from "http-proxy-middleware";
import path from 'path'


dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const router = Router();
// Debug: Log all environment variables
console.log('=== Gateway Environment Variables ===');
console.log('AUTH_SERVICE_URL:', process.env.GATEWAY_AUTH_SERVICE_URL);
console.log('SUBMISSION_SERVICE_URL:', process.env.GATEWAY_SUBMISSION_SERVICE_URL);
console.log('NOTIFY_SERVICE_URL:', process.env.GATEWAY_NOTIFY_SERVICE_URL);
console.log('QUIZ_SERVICE_URL:', process.env.GATEWAY_QUIZ_SERVICE_URL);
console.log('=====================================');




router.use(
  "/api/v1/auth",
  createProxyMiddleware({
    target: process.env.GATEWAY_AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/auth": "" },
  })
);

router.use(
  "/api/v1/submission",
  createProxyMiddleware({
    target: process.env.GATEWAY_SUBMISSION_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/submission": "" },
  })
);

// Notification Service
router.use(
  "/api/v1/notify",
  createProxyMiddleware({
    target: process.env.GATEWAY_NOTIFY_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/notify": "" },
  })
);

// Quiz Service
router.use(
  "/api/v1/quiz",
  createProxyMiddleware({
    target: process.env.GATEWAY_QUIZ_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/v1/quiz": "" },
  })
);

export default router;
