import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload; // Adjust the type based on your `jwt.verify` return type
    }
  }
}
const JWT_SECRET = process.env.AUTH_SERVICE_JWT_SECRET!;

export const authenticate = (req: any, res: any, next: any):void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('No token provided');

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as string | JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
