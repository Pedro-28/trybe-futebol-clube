import { Router } from 'express';
import TeamsService from '../services/TeamsService';
import TeamsController from '../controllers/TeamsController';

export default class TeamsRoute {
  private _routes: Router;
  private controller: TeamsController;

  constructor() {
    this._routes = Router();
    this.controller = new TeamsController(new TeamsService());
    this.config();
  }

  private config(): void {
    this._routes.get('/:id', this.controller.getTeamById);

    this._routes.get('/', this.controller.getAllTeams);
  }

  get routes() {
    return this._routes;
  }
}
