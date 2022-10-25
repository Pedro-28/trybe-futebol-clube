import { StatusCodes } from 'http-status-codes';
import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import * as chaiHttp from 'chai-http';

import { app } from '../app';
import Matches from '../database/models/MatchesModel';
import { matchesMock } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches route test', () => {
  describe('/matches when successful', () => {
    beforeEach(async () => {
      sinon
        .stub(Matches, 'findAll')
        .resolves(matchesMock as any);
    });

    afterEach(sinon.restore);

    it('Should return status 200', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/matches');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    });

    it('Should return json [...]', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/matches');

      expect(chaiHttpResponse.body).to.deep.equal(matchesMock);
    });
  });

  describe('/matches?inProgress=true when successful', () => {
    beforeEach(async () => {
      sinon
        .stub(Matches, 'findAll')
        .resolves([matchesMock[1]] as any);
    });

    afterEach(sinon.restore);

    it('Should return status 200', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    });

    it('Should return json [...]', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true');

      expect(chaiHttpResponse.body).to.deep.equal([matchesMock[1]]);
    });
  });
});
