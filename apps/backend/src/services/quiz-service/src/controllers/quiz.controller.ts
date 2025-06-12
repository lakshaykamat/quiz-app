import { Request, Response } from 'express';
import * as quizService from '../services/quiz.service';

export const createQuiz = async (req: any, res: any) => {
  const quiz = await quizService.createNewQuiz(req.body);
  res.status(201).json(quiz);
};

export const getQuiz = async (req: any, res: any) => {
  try {
    const questionLimit = parseInt(req.query.questionLimit as string);
    
    if (!questionLimit) {
      res.status(400).json({ error: true, message: "Limit is not defined" });
    }

    const quiz = await quizService.getQuizById(req.params.id, questionLimit);


    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
    }
    
    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getQuizzes = async (_req: any, res: any) => {
  const quizzes = await quizService.getAllQuizzes();
  res.status(200).json(quizzes);
};
