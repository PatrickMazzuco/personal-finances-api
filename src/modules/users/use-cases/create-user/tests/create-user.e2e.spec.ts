import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { DatabaseTestHelper } from '@utils/tests/helpers/database';
import { createUserMock } from '@utils/tests/mocks/users.mocks';

describe('Create User E2E', () => {
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

  it('should be able to create a new user', async () => {
    const newUserData = createUserMock();

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(newUserData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to create a user with a duplicated email', async () => {
    const newUserData = createUserMock();

    await request(app.getHttpServer())
      .post('/users')
      .send(newUserData)
      .expect(201);

    await request(app.getHttpServer())
      .post('/users')
      .send(newUserData)
      .expect(400);
  });
});
