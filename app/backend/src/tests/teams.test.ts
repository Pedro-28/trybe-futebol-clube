import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import * as chaiHttp from 'chai-http';

import { app } from '../app';
import Teams from '../database/models/TeamsModel';
import { teamsMock } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams route test', () => {
  describe('/teams when successful', () => {
    beforeEach(async () => {
      sinon
        .stub(Teams, 'findAll')
        .resolves(teamsMock as Teams[]);
    });

    afterEach(sinon.restore);

    it('Should return status 200', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/teams');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    });

    it('Should return json [...]', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/teams');

      expect(chaiHttpResponse.body).to.deep.equal(teamsMock);
    });
  });

  describe('/teams/:id when successful', () => {
    beforeEach(async () => {
      sinon
        .stub(Teams, 'findByPk')
        .resolves(teamsMock[0] as Teams);
    });

    afterEach(sinon.restore);

    it('Should return status 200', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/teams/1');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    });

    it('Should return json {...}', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/teams/1');

      expect(chaiHttpResponse.body).to.deep.equal(teamsMock[0]);
    });
  });
});
