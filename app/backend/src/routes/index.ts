import { Router } from 'express';
import LoginRoute from './LoginRoute';
import 'express-async-errors';

export default class Routes {
  private _routes: Router;

  constructor() {
    this._routes = Router();
    this.config();
  }

  private config(): void {
    const loginRoute = new LoginRoute();

    this._routes.use('/login', loginRoute.routes);
  }

  get routes() {
    return this._routes;
  }
}
