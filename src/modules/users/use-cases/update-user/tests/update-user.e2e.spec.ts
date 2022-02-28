import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { DatabaseTestHelper } from '@utils/tests/helpers/database';
import { createUserMock, updateUserMock } from '@utils/tests/mocks/users.mocks';

describe('Update User E2E', () => {
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

  it('should be able to update an existing user', async () => {
    const newUserData = createUserMock();

    const createdUser = await request(app.getHttpServer())
      .post('/users')
      .send(newUserData)
      .expect(201);

    const updatedUserData = {
      ...createdUser.body,
      name: 'Updated Name',
      password: 'newPass@123',
    };

    await request(app.getHttpServer())
      .put(`/users/${createdUser.body.id}`)
      .send(updatedUserData)
      .expect(204);

    const userResponse = await request(app.getHttpServer())
      .get(`/users/${createdUser.body.id}`)
      .send()
      .expect(200);

    expect(userResponse.body).toHaveProperty('name', updatedUserData.name);
  });

  it("should not be able to change an user's email to an existing email", async () => {
    const newUserData = createUserMock();
    const anotherNewUserData = {
      ...createUserMock(),
      email: 'second.user@email.com',
    };

    const createdUser = await request(app.getHttpServer())
      .post('/users')
      .send(newUserData)
      .expect(201);

    await request(app.getHttpServer())
      .post('/users')
      .send(anotherNewUserData)
      .expect(201);

    const updatedUserData = {
      ...createdUser.body,
      email: anotherNewUserData.email,
    };

    await request(app.getHttpServer())
      .put(`/users/${createdUser.body.id}`)
      .send(updatedUserData)
      .expect(400);
  });

  it('should not be able to update an inexistent user', async () => {
    const updatedUserData = updateUserMock();

    await request(app.getHttpServer())
      .put(`/users/${updatedUserData.id}`)
      .send(updatedUserData)
      .expect(404);
  });
});
