import { Request, Response } from 'express';
import * as quizService from '../services/quiz.service';

export const createQuiz = async (req: Request, res: Response) => {
  const quiz = await quizService.createNewQuiz(req.body);
  res.status(201).json(quiz);
};

export const getQuizzes = async (_req: Request, res: Response) => {
  const quizzes = await quizService.getAllQuizzes();
  res.json(quizzes);
};
