import { Router } from 'express';
import LoginController from '../controllers/LoginController';

export default class LoginRoute {
  private _routes: Router;

  constructor() {
    this._routes = Router();
    this._routes.post('/', LoginController.login);
  }

  get routes() {
    return this._routes;
  }
}
