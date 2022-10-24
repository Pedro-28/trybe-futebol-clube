import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  static login = async (req: Request, res: Response) => {
    const token = await LoginService.login(req.body);
    res.status(200).json({ token });
  };
}
