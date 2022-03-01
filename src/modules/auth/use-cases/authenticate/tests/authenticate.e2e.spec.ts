import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { DatabaseTestHelper } from '@utils/tests/helpers/database';
import { authenticationBodyMock } from '@utils/tests/mocks/auth.mocks';
import { createUserMock } from '@utils/tests/mocks/users.mocks';

describe('Authenticate E2E', () => {
  let app: INestApplication;
  let databaseHelper: DatabaseTestHelper;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    databaseHelper = new DatabaseTestHelper(module);

    await app.init();
  });

  afterAll(async () => {
    await databaseHelper.clearDatabase();
    await app.close();
  });

  beforeEach(async () => {
    await databaseHelper.clearDatabase();
  });

  it('should be able to authenticate', async () => {
    const newUserData = createUserMock();
    const userCredentials = {
      email: newUserData.email,
      password: newUserData.password,
    };

    await request(app.getHttpServer())
      .post('/users')
      .send(newUserData)
      .expect(201);

    const authenticationResponse = await request(app.getHttpServer())
      .post('/auth')
      .send(userCredentials)
      .expect(200);

    expect(authenticationResponse.body).toHaveProperty('accessToken');
  });

  it('should not be able to authenticate with an incorrect email', async () => {
    const userCredentials = authenticationBodyMock();

    await request(app.getHttpServer())
      .post('/auth')
      .send(userCredentials)
      .expect(400);
  });

  it('should not be able to authenticate with an incorrect password', async () => {
    const newUserData = createUserMock();
    const userCredentials = {
      email: newUserData.email,
      password: 'wrong-password',
    };

    await request(app.getHttpServer())
      .post('/users')
      .send(newUserData)
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth')
      .send(userCredentials)
      .expect(400);
  });
});
