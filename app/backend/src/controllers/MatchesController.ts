import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private service: MatchesService) { }

  public getAllMatches = async (_req: Request, res: Response) => {
    const matches = await this.service.getAllMatches();

    res.status(StatusCodes.OK).json(matches);
  };
}
