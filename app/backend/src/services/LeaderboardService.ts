import homeQuery from '../utils/leaderboardQueries';
import Sequelize from '../database/models';

export default class LeaderboardService {
  private model = Sequelize;

  public async getHomeLeaderboard() {
    const [, leaderboard] = await this.model.query(homeQuery);
    return leaderboard;
  }
}
