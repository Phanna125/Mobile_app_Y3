import { Response } from 'express';

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message = 'Operation successful',
    statusCode = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(
    res: Response,
    message = 'Something went wrong',
    statusCode = 400,
    errorCode = 'BAD_REQUEST',
    errors: unknown[] = []
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      error_code: errorCode,
      errors,
    });
  }
}
