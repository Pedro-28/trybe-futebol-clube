import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import LoginService from '../services/LoginService';

export default class LoginController {
  static login = async (req: Request, res: Response) => {
    const token = await LoginService.login(req.body);

    res.status(StatusCodes.OK).json({ token });
  };
}
