import express from 'express';
import { sendWelcomeEmail, sendVerificationEmail } from '../controllers/emailController';

const router = express.Router();

router.post('/welcome', sendWelcomeEmail);
router.post('/verify-email', sendVerificationEmail);
router.get('/test', (req:any, res:any) => {
  res.status(200).json({ message: 'Email service is working' });    
})

export default router;
