import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

// Auth routes (no auth middleware here)
router.use('/api/v1/auth', createProxyMiddleware({
  target: 'http://127.0.0.1:4001',
  changeOrigin: true,
  //@ts-ignore
  logLevel: 'debug'
}));

// Quiz routes (authenticated)
router.use('/api/v1/quizzes', authenticate,createProxyMiddleware({
  target: 'http://localhost:4002',
  changeOrigin: true
}));

// Submission routes (authenticated)
router.use('/api/v1/submissions', authenticate, createProxyMiddleware({
  target: 'http://localhost:4003',
  changeOrigin: true
}));

export default router;
