import { NextFunction, Request, Response } from 'express';

export default interface IValidationMiddleware {
  validateBody(req:Request, res:Response, next:NextFunction): void
}
