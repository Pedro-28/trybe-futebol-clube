import { Router } from 'express';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';
import { ILoginValidationMiddleware } from '../interfaces/LoginInterface';

export default class LoginRoute {
  private _routes: Router;
  private middleware: ILoginValidationMiddleware;
  private controller: LoginController;

  constructor() {
    this._routes = Router();
    this.middleware = new LoginMiddleware();
    this.controller = new LoginController(new LoginService());
    this.config();
  }

  private config(): void {
    const { validateToken, validateBody } = this.middleware;

    this._routes.get('/validate', validateToken, this.controller.getRole);

    this._routes.post('/', validateBody, this.controller.login);
  }

  get routes() {
    return this._routes;
  }
}
