import express from 'express';
import { signup, login, getProfile, getProgressData } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authenticate,getProfile);
router.get('/progress', authenticate,getProgressData);

export default router;
