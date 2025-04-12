import express from 'express';
import { submitQuiz, getSubmissions } from '../controllers/submission.controller';

const router = express.Router();

router.post('/', submitQuiz);
router.get('/:userId', getSubmissions);

export default router;
