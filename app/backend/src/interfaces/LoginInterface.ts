import { NextFunction, Request, Response } from 'express';
import IValidationMiddleware from './ValidationMiddleware';

export interface ILoginDTO {
  email: string,
  password: string
}

export interface ILoginValidationMiddleware extends IValidationMiddleware {
  validateToken(req: Request, res: Response, next: NextFunction): void
}
