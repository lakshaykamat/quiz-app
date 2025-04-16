import express from 'express';
import { sendWelcomeEmail, sendVerificationEmail } from '../controllers/emailController';

const router = express.Router();

router.post('/welcome', sendWelcomeEmail);
router.post('/verify-email', sendVerificationEmail);

export default router;
