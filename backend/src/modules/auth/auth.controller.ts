import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { ApiResponse } from '../../utils/api_response';
import { AuthRequest } from '../../middlewares/auth.middleware';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return ApiResponse.error(res, 'Email and password are required', 400);
      }

      // Starter demo response matching docs/api_contract.md
      // Replace with Prisma DB lookup once `npx prisma migrate dev` is run
      const mockUser = {
        id: 'usr_01',
        name: 'Phanna',
        email,
        avatar_url: null,
      };

      const accessToken = jwt.sign(
        { id: mockUser.id, email: mockUser.email },
        env.jwtSecret,
        { expiresIn: '7d' }
      );

      return ApiResponse.success(
        res,
        { access_token: accessToken, user: mockUser },
        'Login successful'
      );
    } catch (error) {
      next(error);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return ApiResponse.error(res, 'Name, email, and password are required', 400);
      }

      const newUser = {
        id: 'usr_02',
        name,
        email,
        avatar_url: null,
      };

      const accessToken = jwt.sign(
        { id: newUser.id, email: newUser.email },
        env.jwtSecret,
        { expiresIn: '7d' }
      );

      return ApiResponse.success(
        res,
        { access_token: accessToken, user: newUser },
        'User registered successfully',
        201
      );
    } catch (error) {
      next(error);
    }
  }

  static async me(req: AuthRequest, res: Response) {
    return ApiResponse.success(
      res,
      {
        id: req.user?.id || 'usr_01',
        name: 'Phanna',
        email: req.user?.email || 'phanna@example.com',
        avatar_url: null,
      },
      'Profile fetched'
    );
  }
}
