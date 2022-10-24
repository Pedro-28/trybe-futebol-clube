import { Router } from 'express';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import LoginRoute from './LoginRoute';
import 'express-async-errors';

export default class Routes {
  private _routes: Router;

  constructor() {
    this._routes = Router();
    this.config();
  }

  private config(): void {
    const loginRoute = new LoginRoute(new LoginMiddleware());

    this._routes.use('/login', loginRoute.routes);
  }

  get routes() {
    return this._routes;
  }
}
