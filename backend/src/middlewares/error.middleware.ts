import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/api_response';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('[API Error]:', err.message);
  return ApiResponse.error(
    res,
    err.message || 'Internal Server Error',
    500,
    'INTERNAL_SERVER_ERROR'
  );
};
