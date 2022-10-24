import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import IValidationMiddleware from '../interfaces/ValidationMiddleware';
import CustomError from '../utils/CustomError';

export default class LoginMiddleware implements IValidationMiddleware {
  public validateBody = (req: Request, _res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      throw new CustomError(StatusCodes.BAD_REQUEST, 'All fields must be filled');
    }

    next();
  };
}
