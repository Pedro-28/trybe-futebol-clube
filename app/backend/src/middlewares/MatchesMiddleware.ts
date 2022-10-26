import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Token from '../utils/Token';

import CustomError from '../utils/CustomError';
import IValidationMiddleware from '../interfaces/ValidationMiddleware';

export default class MatchesMiddleware implements IValidationMiddleware {
  public validateBody = (req: Request, _res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    if (!homeTeam || !awayTeam || !homeTeamGoals || !awayTeamGoals) {
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
      Token.tokenVerify(authorization);

      next();
    } catch {
      throw new CustomError(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }
  };
}
