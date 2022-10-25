import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private service: TeamsService) { }

  public getAllTeams = async (_req: Request, res: Response) => {
    const teams = await this.service.getAllTeams();

    res.status(StatusCodes.OK).json(teams);
  };

  public getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const teams = await this.service.getTeamById(id);

    res.status(StatusCodes.OK).json(teams);
  };
}
