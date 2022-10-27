import { StatusCodes } from 'http-status-codes';
import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import * as chaiHttp from 'chai-http';

import { app } from '../app';
import Sequelize from '../database/models';
import { homeLeaderboardMock } from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard route test', () => {
  describe('/leaderboard/home when successful', () => {
    beforeEach(async () => {
      sinon
        .stub(Sequelize, 'query')
        .resolves(homeLeaderboardMock as any);
    });

    afterEach(sinon.restore);

    it('Should return status 200', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    });

    it('Should return json [...]', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home');

      expect(chaiHttpResponse.body).to.deep.equal(homeLeaderboardMock[1]);
    });
  });
});
