/* eslint-disable @typescript-eslint/no-explicit-any */
// globalErrorHandlers.ts
import { NextFunction, Request, Response } from 'express';

const globalErrorHandlers = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || 500;
  const message = err.message || 'Something went wrong !!!';

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandlers;
