import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

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
}
