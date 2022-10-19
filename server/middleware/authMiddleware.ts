import { Request, Response, NextFunction } from "express";

// Protected routes middleware
export const protect = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
//   maybe redirect to log in if not authorized
    res.status(401).json({ error: "Not authorized" });
};
