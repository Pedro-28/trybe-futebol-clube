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
  userMock, incorrectFieldsMessageMock, incorrectLoginBodyMock
} from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login route test', () => {
  describe('When successful', () => {
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

  describe('When the request is invalid', () => {
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
});
