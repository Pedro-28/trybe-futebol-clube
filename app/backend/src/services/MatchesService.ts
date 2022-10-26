import { StatusCodes } from 'http-status-codes';

import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import CustomError from '../utils/CustomError';
import IUpdateMatch from '../interfaces/MatchesInterface';

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

    const teamsIds = [homeTeam, awayTeam];
    const teams = await Promise.all(teamsIds.map((id) => Teams.findByPk(id)));

    if (teams.some((team) => team === null)) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        'There is no team with such id!',
      );
    }

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

  public async updateInProgressMatches({ homeTeamGoals, awayTeamGoals }: IUpdateMatch, id: string) {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
