import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private service: MatchesService) { }

  public getAllMatches = async (_req: Request, res: Response) => {
    const matches = await this.service.getAllMatches();

    res.status(StatusCodes.OK).json(matches);
  };

  public getInProgressMatches = async (req: Request, res: Response, next: NextFunction) => {
    const inProgress = req.query.inProgress as string;

    if (!inProgress) {
      return next();
    }

    const matches = await this.service.getInProgressMatches(inProgress === 'true');

    res.status(StatusCodes.OK).json(matches);
  };

  public insert = async (req: Request, res: Response) => {
    const match = await this.service.insert(req.body);

    res.status(StatusCodes.CREATED).json(match);
  };

  public finish = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.service.finish(id);

    res.status(StatusCodes.OK).json({ message: 'Finished' });
  };

  public updateInProgressMatches = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.service.updateInProgressMatches(req.body, id);

    res.status(StatusCodes.OK).json({ message: 'Updated' });
  };
}
