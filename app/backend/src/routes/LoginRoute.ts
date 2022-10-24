import { Router } from 'express';
import IValidationMiddleware from '../interfaces/ValidationMiddleware';
import LoginController from '../controllers/LoginController';

export default class LoginRoute {
  private _routes: Router;
  private middleware: IValidationMiddleware;

  constructor(middleware: IValidationMiddleware) {
    this._routes = Router();
    this.middleware = middleware;
    this.config();
  }

  private config(): void {
    const { validateBody } = this.middleware;
    this._routes.post('/', validateBody, LoginController.login);
  }

  get routes() {
    return this._routes;
  }
}
