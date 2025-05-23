import { Request, Response } from 'express';
import * as submissionService from '../services/submission.service';

export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const submission = await submissionService.submitQuiz(req.body);
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting quiz', error: err });
  }
};

export const getSubmissions = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const subs = await submissionService.getUserSubmissions(userId);
  res.json(subs);
};
