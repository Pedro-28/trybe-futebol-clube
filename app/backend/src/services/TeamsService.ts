import Teams from '../database/models/TeamsModel';

export default class TeamsService {
  private model = Teams;

  public async getAllTeams() {
    const teams = await this.model.findAll();
    return teams;
  }

  public async getTeamById(id: string) {
    const team = await this.model.findByPk(id);
    return team;
  }
}
