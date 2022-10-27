import { homeQuery, awayQuery } from '../utils/leaderboardQueries';
import Sequelize from '../database/models';

export default class LeaderboardService {
  private model = Sequelize;

  public async getHomeLeaderboard() {
    const [, leaderboard] = await this.model.query(homeQuery);
    return leaderboard;
  }

  public async getAwayLeaderboard() {
    const [, leaderboard] = await this.model.query(awayQuery);
    return leaderboard;
  }
}
