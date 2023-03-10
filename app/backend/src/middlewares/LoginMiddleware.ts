import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Token from '../utils/Token';

import CustomError from '../utils/CustomError';
import IValidationMiddleware from '../interfaces/ValidationMiddleware';

export default class LoginMiddleware implements IValidationMiddleware {
  public validateBody = (req: Request, _res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError(StatusCodes.BAD_REQUEST, 'All fields must be filled');
    }

    next();
  };

  public validateToken = (req: Request, _res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new CustomError(StatusCodes.BAD_REQUEST, 'Token not found');
    }

    try {
      const payload = Token.tokenVerify(authorization);
      req.body = payload;

      next();
    } catch {
      throw new CustomError(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }
  };
}
