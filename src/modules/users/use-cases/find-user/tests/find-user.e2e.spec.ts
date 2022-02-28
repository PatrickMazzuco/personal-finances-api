import * as request from 'supertest';
import { v4 as uuid } from 'uuid';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { DatabaseTestHelper } from '@utils/tests/helpers/database';
import { createUserMock } from '@utils/tests/mocks/users.mocks';

describe('Find User E2E', () => {
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

  it('should be able to find an existing user', async () => {
    const newUserData = createUserMock();

    const createdUser = await request(app.getHttpServer())
      .post('/users')
      .send(newUserData)
      .expect(201);

    const userResponse = await request(app.getHttpServer())
      .get(`/users/${createdUser.body.id}`)
      .send()
      .expect(200);

    expect(userResponse.body).toHaveProperty('id', createdUser.body.id);
  });

  it('should not be able to find an inexistent user', async () => {
    await request(app.getHttpServer())
      .get(`/users/${uuid()}`)
      .send()
      .expect(404);
  });
});
