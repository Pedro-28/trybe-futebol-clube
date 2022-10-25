import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private service: LoginService) { }

  login = async (req: Request, res: Response) => {
    const token = await this.service.login(req.body);

    res.status(StatusCodes.OK).json({ token });
  };

  getRole = async (req: Request, res: Response) => {
    const { id } = req.body;

    const role = await this.service.getRole(id);

    res.status(StatusCodes.OK).json({ role });
  };
}
