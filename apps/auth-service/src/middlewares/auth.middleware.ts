import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload; // Adjust the type based on your `jwt.verify` return type
    }
  }
}
//TODO use a better secret key and store it in an env variable
const JWT_SECRET = "dj}h%XQt}&{2KhH";

export const authenticate = (req: Request, res: Response, next: NextFunction):void => {
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
