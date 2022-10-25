import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';

export default class MatchesRoute {
  private _routes: Router;
  private controller: MatchesController;

  constructor() {
    this._routes = Router();
    this.controller = new MatchesController(new MatchesService());
    this.config();
  }

  private config(): void {
    this._routes.get('/', this.controller.getInProgressMatches);
    this._routes.get('/', this.controller.getAllMatches);
  }

  get routes() {
    return this._routes;
  }
}
