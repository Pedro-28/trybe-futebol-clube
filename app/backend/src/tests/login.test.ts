import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import * as chaiHttp from 'chai-http';

import { app } from '../app';
import Users from '../database/models/UsersModel';
import {
  undefinedFieldsMessageMock, bodyMock, jwtMock, loginBodyMock,
  userMock, incorrectFieldsMessageMock, incorrectLoginBodyMock, payloadMock, tokenNotFoundMock, invalidtokenMock, unknownUserMock
} from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login route test', () => {
  describe('/login when successful', () => {
    beforeEach(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(userMock as Users);

      sinon
        .stub(jwt, 'sign')
        .resolves(jwtMock);
    });

    afterEach(sinon.restore);

    it('Should return status 200', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginBodyMock);

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    });

    it('Should return json { token: \'...\' }', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginBodyMock);

      expect(chaiHttpResponse.body).to.deep.equal(bodyMock);
    });
  });

  describe('/login when the request is invalid', () => {
    afterEach(sinon.restore);

    it('Should return status 400 when email is undefined', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: loginBodyMock.password });

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
    });

    it('Should return json { message: \'...\' } when email is undefined', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: loginBodyMock.password });

      expect(chaiHttpResponse.body).to.deep.equal(undefinedFieldsMessageMock);
    });

    it('Should return status 400 when password is undefined', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: loginBodyMock.email });

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
    });

    it('Should return json { message: \'...\' } when password is undefined', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: loginBodyMock.email });

      expect(chaiHttpResponse.body).to.deep.equal(undefinedFieldsMessageMock);
    });

    it('Should return status 401 when email is incorrect', async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(null);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(incorrectLoginBodyMock);

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.UNAUTHORIZED);
    });

    it('Should return json { message: \'...\' } when email is incorrect', async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(null);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(incorrectLoginBodyMock);

      expect(chaiHttpResponse.body).to.deep.equal(incorrectFieldsMessageMock);
    });

    it('Should return status 401 when password is incorrect', async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(userMock as Users);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(incorrectLoginBodyMock);

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.UNAUTHORIZED);
    });

    it('Should return json { message: \'...\' } when password is incorrect', async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(userMock as Users);

      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(incorrectLoginBodyMock);

      expect(chaiHttpResponse.body).to.deep.equal(incorrectFieldsMessageMock);
    });
  });

  describe('/login/validate when successful', () => {
    beforeEach(async () => {
      sinon
        .stub(Users, 'findByPk')
        .resolves(userMock as Users);

      sinon
        .stub(jwt, 'verify')
        .resolves(payloadMock);
    });

    afterEach(sinon.restore);

    it('Should return status 200', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', jwtMock);

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
    });

    it('Should return json { role: \'admin\' }', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', jwtMock);

      expect(chaiHttpResponse.body).to.deep.equal({ role: userMock.role });
    });
  });

  describe('/login/validate when the request is invalid', () => {
    afterEach(sinon.restore);

    it('Should return status 400 when authorization is undefined', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.BAD_REQUEST);
    });

    it('Should return json { message: \'...\' } when authorization is undefined', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate');

      expect(chaiHttpResponse.body).to.deep.equal(tokenNotFoundMock);
    });

    it('Should return status 401 when token is invalid', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'invalidToken');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.UNAUTHORIZED);
    });

    it('Should return json { message: \'...\' } when token is invalid', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'invalidToken');

      expect(chaiHttpResponse.body).to.deep.equal(invalidtokenMock);
    });

    it('Should return status 424 when user is unknown', async () => {
      sinon
        .stub(Users, 'findByPk')
        .resolves(null);

      sinon
        .stub(jwt, 'verify')
        .resolves(payloadMock);

      const chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'unknownUserToken');

      expect(chaiHttpResponse.status).to.be.equal(StatusCodes.FAILED_DEPENDENCY);
    });

    it('Should return json { message: \'...\' } when user is unknown', async () => {
      sinon
        .stub(Users, 'findByPk')
        .resolves(null);

      sinon
        .stub(jwt, 'verify')
        .resolves(payloadMock);

      const chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'unknownUserToken');

      expect(chaiHttpResponse.body).to.deep.equal(unknownUserMock);
    });
  });
});
