import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import * as chaiHttp from 'chai-http';

import { app } from '../app';
import Users from '../database/models/UsersModel';
import { bodyMock, jwtMock, loginBodyMock, userMock } from './mocks/login.mock';

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

      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it('Should return json { token: \' ...\' }', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginBodyMock);

      expect(chaiHttpResponse.body).to.deep.equal(bodyMock);
    });
  });
});
