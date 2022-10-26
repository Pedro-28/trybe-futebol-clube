import { StatusCodes } from 'http-status-codes';

import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import CustomError from '../utils/CustomError';

export default class MatchesService {
  private model = Matches;

  public async getAllMatches() {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, attributes: { exclude: ['id'] }, as: 'teamHome' },
        { model: Teams, attributes: { exclude: ['id'] }, as: 'teamAway' },
      ],
    });

    return matches;
  }

  public async getInProgressMatches(inProgress: boolean) {
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, attributes: { exclude: ['id'] }, as: 'teamHome' },
        { model: Teams, attributes: { exclude: ['id'] }, as: 'teamAway' },
      ],
    });

    return matches;
  }

  public async insert(newMatch: Matches) {
    const { homeTeam, awayTeam } = newMatch;

    if (homeTeam === awayTeam) {
      throw new CustomError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        'It is not possible to create a match with two equal teams',
      );
    }

    const match = await this.model.create({ ...newMatch, inProgress: true });

    return match;
  }

  public async finish(id: string) {
    await this.model.update({ inProgress: false }, { where: { id } });
  }
}
