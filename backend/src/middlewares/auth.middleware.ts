import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiResponse } from '../utils/api_response';

export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ApiResponse.error(
      res,
      'Unauthorized: Missing Bearer token',
      401,
      'UNAUTHORIZED'
    );
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as {
      id: string;
      email: string;
    };
    req.user = decoded;
    next();
  } catch {
    return ApiResponse.error(
      res,
      'Unauthorized: Invalid or expired token',
      401,
      'TOKEN_EXPIRED'
    );
  }
};
