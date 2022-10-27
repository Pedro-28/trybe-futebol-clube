import { Router } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';

export default class LeaderboardRoute {
  private _routes: Router;
  private controller: LeaderboardController;

  constructor() {
    this._routes = Router();
    this.controller = new LeaderboardController(new LeaderboardService());
    this.config();
  }

  private config(): void {
    this._routes.get('/home', this.controller.getHomeLeaderboard);
  }

  get routes() {
    return this._routes;
  }
}
