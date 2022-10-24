import { Router } from 'express';
import LoginRoute from './LoginRoute';

export default class Routes {
  private _routes: Router;

  constructor() {
    this._routes = Router();
    this._routes.use('/login', new LoginRoute().routes);
  }

  get routes() {
    return this._routes;
  }
}
