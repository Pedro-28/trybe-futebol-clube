import { Router } from 'express';
import IValidationMiddleware from '../interfaces/ValidationMiddleware';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';
import MatchesMiddleware from '../middlewares/MatchesMiddleware';

export default class MatchesRoute {
  private _routes: Router;
  private middleware: IValidationMiddleware;
  private controller: MatchesController;

  constructor() {
    this._routes = Router();
    this.middleware = new MatchesMiddleware();
    this.controller = new MatchesController(new MatchesService());
    this.config();
  }

  private config(): void {
    const { validateToken, validateBody } = this.middleware;

    this._routes.patch('/:id/finish', this.controller.finish);

    this._routes.post('/', validateToken, validateBody, this.controller.insert);

    this._routes.get('/', this.controller.getInProgressMatches);
    this._routes.get('/', this.controller.getAllMatches);
  }

  get routes() {
    return this._routes;
  }
}
