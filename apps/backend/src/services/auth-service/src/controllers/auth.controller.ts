import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { JwtPayload } from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const getProgressData = async (req: Request, res: Response):Promise<void> => {
  try {
    //@ts-ignore
    if (!req.user|| !req.user.id) {
      res.status(401).json({ message: "Unauthorized" });
    }

    //@ts-ignore
    const progressData = await authService.getUserProgressData(req.user.id);
    res.status(200).json(progressData);
  } catch (error) {
    console.error("Error fetching progress data:", error);
    res.status(500).json({ message: "An unknown error occurred" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { token, user } = await authService.login(
      req.body.email,
      req.body.password
    );
    res.json({ token, user });
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ message: err.message });
    } else {
      res.status(401).json({ message: "An unknown error occurred" });
    }
  }
};

export const getProfile = async (req: any, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const user = await authService.getUserProfile((req.user as JwtPayload).id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
