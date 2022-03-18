import * as request from 'supertest';
import { v4 as uuid } from 'uuid';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { DatabaseTestHelper } from '@utils/tests/helpers/database';
import { createRecurringTransactionMock } from '@utils/tests/mocks/recurring-transactions.mocks';
import { createUserMock } from '@utils/tests/mocks/users.mocks';

describe('FindRecurringTransaction E2E', () => {
  let app: INestApplication;

  let databaseHelper: DatabaseTestHelper;

  let recurringTransactionId: string;
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
    const newRecurringTransactionData = createRecurringTransactionMock();

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
      .post('/recurring-transactions')
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .send(newRecurringTransactionData)
      .expect(201);

    recurringTransactionId = createdTransaction.body.id;
    userToken = loginResponse.body.accessToken;
  }

  beforeEach(async () => {
    await databaseHelper.clearDatabase();
    await setupData();
  });

  it('should be able to find an existing recurring transaction', async () => {
    const existingTransaction = await request(app.getHttpServer())
      .get(`/recurring-transactions/${recurringTransactionId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send()
      .expect(200);

    expect(existingTransaction.body).toHaveProperty('id');
  });

  it('should not be able to find an inexistent recurring transaction', async () => {
    await request(app.getHttpServer())
      .get(`/recurring-transactions/${uuid()}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send()
      .expect(404);
  });

  it("should not be able to find another user's recurring transaction", async () => {
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
      .get(`/recurring-transactions/${recurringTransactionId}`)
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .send()
      .expect(403);
  });

  it('should not be able to find a recurring transaction when not authenticated', async () => {
    await request(app.getHttpServer())
      .get(`/recurring-transactions/${recurringTransactionId}`)
      .send()
      .expect(401);
  });
});
