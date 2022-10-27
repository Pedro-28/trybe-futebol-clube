import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private service: LeaderboardService) { }

  public getHomeLeaderboard = async (_req: Request, res: Response) => {
    const homeLeaderboard = await this.service.getHomeLeaderboard();

    res.status(StatusCodes.OK).json(homeLeaderboard);
  };

  public getAwayLeaderboard = async (_req: Request, res: Response) => {
    const awayLeaderboard = await this.service.getAwayLeaderboard();

    res.status(StatusCodes.OK).json(awayLeaderboard);
  };
}
