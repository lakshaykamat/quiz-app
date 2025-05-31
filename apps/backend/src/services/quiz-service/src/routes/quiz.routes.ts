import express from 'express';
import { createQuiz, getQuizzes,getQuiz } from '../controllers/quiz.controller';
const router = express.Router();

router.post('/', createQuiz);
router.get('/', getQuizzes);
//@ts-ignore
router.get('/:id',getQuiz);

export default router;
