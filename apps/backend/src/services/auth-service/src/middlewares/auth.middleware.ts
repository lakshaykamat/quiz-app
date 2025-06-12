import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      user?: string
    }
  }
}

export const authenticate = (req: any, res: any, next: any):void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('No token provided');
  try {
    const decoded = jwt.verify(token, process.env.AUTH_SERVICE_JWT_SECRET!) as string;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
