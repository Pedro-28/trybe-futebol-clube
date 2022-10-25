import { Router } from 'express';
import LoginRoute from './LoginRoute';
import 'express-async-errors';
import TeamsRoute from './TeamsRoute';

export default class Routes {
  private _routes: Router;

  constructor() {
    this._routes = Router();
    this.config();
  }

  private config(): void {
    const loginRoute = new LoginRoute();
    const teamsRoute = new TeamsRoute();

    this._routes.use('/login', loginRoute.routes);
    this._routes.use('/teams', teamsRoute.routes);
  }

  get routes() {
    return this._routes;
  }
}
