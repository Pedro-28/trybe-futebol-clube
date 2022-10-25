import { Router } from 'express';
import 'express-async-errors';

import LoginRoute from './LoginRoute';
import TeamsRoute from './TeamsRoute';
import MatchesRoute from './MatchesRoute';

export default class Routes {
  private _routes: Router;

  constructor() {
    this._routes = Router();
    this.config();
  }

  private config(): void {
    const loginRoute = new LoginRoute();
    const teamsRoute = new TeamsRoute();
    const matchesRoute = new MatchesRoute();

    this._routes.use('/login', loginRoute.routes);
    this._routes.use('/teams', teamsRoute.routes);
    this._routes.use('/matches', matchesRoute.routes);
  }

  get routes() {
    return this._routes;
  }
}
