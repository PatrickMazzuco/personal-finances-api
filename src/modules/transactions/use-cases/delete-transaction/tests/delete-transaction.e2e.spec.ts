import * as request from 'supertest';
import { v4 as uuid } from 'uuid';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { DatabaseTestHelper } from '@utils/tests/helpers/database';
import { createTransactionMock } from '@utils/tests/mocks/transactions.mocks';
import { createUserMock } from '@utils/tests/mocks/users.mocks';

describe('DeleteTransaction E2E', () => {
  let app: INestApplication;

  let databaseHelper: DatabaseTestHelper;

  let transactionId: string;
  let userToken: string;

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

  async function setupData() {
    const newUserData = {
      ...createUserMock(),
      email: 'mock.user@email.com',
    };
    const newTransactionData = createTransactionMock();

    await request(app.getHttpServer())
      .post('/users')
      .send(newUserData)
      .expect(201);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: newUserData.email,
        password: newUserData.password,
      })
      .expect(200);

    const createdTransaction = await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .send(newTransactionData)
      .expect(201);

    transactionId = createdTransaction.body.id;
    userToken = loginResponse.body.accessToken;
  }

  beforeEach(async () => {
    await databaseHelper.clearDatabase();
    await setupData();
  });

  it('should be able to delete an existing transaction', async () => {
    await request(app.getHttpServer())
      .delete(`/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send()
      .expect(204);
  });

  it('should not be able to delete an inexistent transaction', async () => {
    await request(app.getHttpServer())
      .delete(`/transactions/${uuid()}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send()
      .expect(404);
  });

  it("should not be able to delete another user's transaction", async () => {
    const newUserData = createUserMock();

    await request(app.getHttpServer())
      .post('/users')
      .send(newUserData)
      .expect(201);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth')
      .send({
        email: newUserData.email,
        password: newUserData.password,
      })
      .expect(200);

    await request(app.getHttpServer())
      .delete(`/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .send()
      .expect(403);
  });

  it('should not be delete a transaction when not authenticated', async () => {
    await request(app.getHttpServer())
      .delete(`/transactions/${transactionId}`)
      .send()
      .expect(401);
  });
});
