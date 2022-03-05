import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { DatabaseTestHelper } from '@utils/tests/helpers/database';
import { createTransactionMock } from '@utils/tests/mocks/transactions.mocks';
import { createUserMock } from '@utils/tests/mocks/users.mocks';

describe('CreateTransaction E2E', () => {
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

  it('should be able to create a new transaction', async () => {
    const newUserData = createUserMock();
    const newTransactionData = createTransactionMock();

    const createdUser = await request(app.getHttpServer())
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

    expect(createdTransaction.body).toHaveProperty('id');
    expect(createdTransaction.body).toHaveProperty(
      'userId',
      createdUser.body.id,
    );
  });

  it('should be able to create a new transaction when not sending a payment date', async () => {
    const newUserData = createUserMock();
    const newTransactionData = createTransactionMock();

    delete newTransactionData.paymentDate;

    const createdUser = await request(app.getHttpServer())
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

    expect(createdTransaction.body).toHaveProperty('id');
    expect(createdTransaction.body).toHaveProperty(
      'userId',
      createdUser.body.id,
    );
  });

  it('should not be create a new transaction when not authenticated', async () => {
    const newTransactionData = createTransactionMock();

    await request(app.getHttpServer())
      .post('/transactions')
      .send(newTransactionData)
      .expect(401);
  });
});
