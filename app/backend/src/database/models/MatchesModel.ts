import { Model, INTEGER } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: number;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },

  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },

  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },

  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },

  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },

  inProgress: {
    allowNull: false,
    type: INTEGER,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'awayTeam' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeTeams' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayTeams' });

export default Matches;