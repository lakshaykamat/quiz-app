import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { JwtPayload } from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
  try {
    const user = authService.signup(req.body);
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { token, user } = await authService.login(req.body.email, req.body.password);
    res.json({ token, user });
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ message: err.message });
    } else {
      res.status(401).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const user = await authService.getUserProfile((req.user as JwtPayload).userId);
  res.json(user);
};
