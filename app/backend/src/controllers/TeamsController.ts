import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private service: TeamsService) { }

  getAllTeams = async (_req: Request, res: Response) => {
    const teams = await this.service.getAllTeams();

    res.status(StatusCodes.OK).json(teams);
  };
}
