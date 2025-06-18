import express from 'express';
import { signup, login, getUserById, getProfile,getProgressData, getUserByName } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authenticate, getProfile);
router.get('/progress', authenticate,getProgressData);
router.get('/find/:name',authenticate, getUserByName);
router.get('/get/:id', authenticate, getUserById); // Assuming this is to get user by ID
export default router;
