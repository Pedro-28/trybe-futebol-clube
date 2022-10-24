import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../utils/CustomError';

const errorMiddleware: ErrorRequestHandler = (err: CustomError, _req, res, _next) => {
  const { status, message } = err;
  res.status(status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
};

export default errorMiddleware;
