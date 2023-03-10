import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import * as chaiHttp from 'chai-http';

import { app } from '../app';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import {
  createMatchMock, finishMatchMock, finishMessageMock, invalidtokenMock, jwtMock,
  matchBodyMock, matchesMock, payloadMock, sameMatchBodyMock, sameMatchesMessageMock,
  teamMock, tokenNotFoundMock, undefinedFieldsMessageMock, unknownTeamMessageMock,
  updateMatchBodyMock, updateMatchMock, updateMessageMock
} from './mocks/matches.mock';

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

  describe('POST /matches when successful', () => {
    beforeEach(async () => {
      sinon
        .stub(Matches, 'create')
        .resolves(createMatchMock as Matches);

      sinon
        .stub(jwt, 'verify')
        .resolves(payloadMock);
    });

    afterEach(sinon.restore);

    it('Should return status 201', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(matchBodyMock)
        .set('Authorization', jwtMock);

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.CREATED);
    });

    it('Should return json {...}', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(matchBodyMock)
        .set('Authorization', jwtMock);

      expect(chaiHttpResponse.body).to.deep.equal(createMatchMock);
    });
  });

  describe('POST /matches when the request is invalid', () => {
    afterEach(sinon.restore);

    it('Should return status 400 when authorization is undefined', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
    });

    it('Should return json { message: \'...\' } when authorization is undefined', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches');

      expect(chaiHttpResponse.body).to.deep.equal(tokenNotFoundMock);
    });

    it('Should return status 401 when token is invalid', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', 'invalidToken');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.UNAUTHORIZED);
    });

    it('Should return json { message: \'...\' } when token is invalid', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', 'invalidToken');

      expect(chaiHttpResponse.body).to.deep.equal(invalidtokenMock);
    });

    it('Should return status 400 when any field is undefined', async () => {
      sinon
        .stub(jwt, 'verify')
        .resolves(payloadMock);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', jwtMock);;

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
    });

    it('Should return json { message: \'...\' } when any field is undefined', async () => {
      sinon
        .stub(jwt, 'verify')
        .resolves(payloadMock);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', jwtMock);;

      expect(chaiHttpResponse.body).to.deep.equal(undefinedFieldsMessageMock);
    });

    it('Should return status 404 when team is unknown', async () => {
      sinon
        .stub(jwt, 'verify')
        .resolves(payloadMock);

      sinon
        .stub(Teams, 'findByPk')
        .resolves(null);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(matchBodyMock)
        .set('Authorization', jwtMock);

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.NOT_FOUND);
    });

    it('Should return json { message: \'...\' } when team is unknown', async () => {
      sinon
        .stub(jwt, 'verify')
        .resolves(payloadMock);

      sinon
        .stub(Teams, 'findByPk')
        .resolves(null);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(matchBodyMock)
        .set('Authorization', jwtMock);

      expect(chaiHttpResponse.body).to.deep.equal(unknownTeamMessageMock);
    });

    it('Should return status 422 when matches are equal', async () => {
      sinon
        .stub(jwt, 'verify')
        .resolves(payloadMock);

      sinon
        .stub(Teams, 'findByPk')
        .resolves(teamMock as Teams);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(sameMatchBodyMock)
        .set('Authorization', jwtMock);

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.UNPROCESSABLE_ENTITY);
    });

    it('Should return json { message: \'...\' } when matches are equal', async () => {
      sinon
        .stub(jwt, 'verify')
        .resolves(payloadMock);

      sinon
        .stub(Teams, 'findByPk')
        .resolves(teamMock as Teams);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(sameMatchBodyMock)
        .set('Authorization', jwtMock);

      expect(chaiHttpResponse.body).to.deep.equal(sameMatchesMessageMock);
    });
  });

  describe('PATCH /matches/:id/finish when successful', () => {
    beforeEach(async () => {
      sinon
        .stub(Matches, 'update')
        .resolves(finishMatchMock as any);
    });

    afterEach(sinon.restore);

    it('Should return status 200', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    });

    it('Should return json {...}', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1/finish');

      expect(chaiHttpResponse.body).to.deep.equal(finishMessageMock);
    });
  });

  describe('PATCH /matches/:id when successful', () => {
    beforeEach(async () => {
      sinon
        .stub(Matches, 'update')
        .resolves(updateMatchMock as any);
    });

    afterEach(sinon.restore);

    it('Should return status 200', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .send(updateMatchBodyMock);

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    });

    it('Should return json {...}', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/1')
        .send(updateMatchBodyMock);

      expect(chaiHttpResponse.body).to.deep.equal(updateMessageMock);
    });
  });
});
