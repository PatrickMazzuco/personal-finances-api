import * as request from 'supertest';

import { TransactionType } from '@modules/transactions/enums/transaction-type.enum';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ClassValidatorPipe } from '@pipes/validation.pipe';
import { AppModule } from '@src/app.module';
import { DatabaseTestHelper } from '@utils/tests/helpers/database';
import { createTransactionMock } from '@utils/tests/mocks/transactions.mocks';
import { createUserMock } from '@utils/tests/mocks/users.mocks';

describe('ListTransactions E2E', () => {
  let app: INestApplication;

  let databaseHelper: DatabaseTestHelper;
  let userToken: string;
  let futurePaymentDate: Date;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ClassValidatorPipe({
        whitelist: true,
        transform: true,
      }),
    );

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

    await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .send(newTransactionData)
      .expect(201);

    const futureDate = new Date();
    futureDate.setFullYear(new Date().getFullYear() + 1);

    await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .send({
        ...newTransactionData,
        type: TransactionType.INCOME,
        description: 'descritpion to filter',
        paymentDate: futureDate,
      })
      .expect(201);

    userToken = loginResponse.body.accessToken;
    futurePaymentDate = futureDate;
  }

  beforeEach(async () => {
    await databaseHelper.clearDatabase();
    await setupData();
  });

  it("should be able to list a user's transactions", async () => {
    const existingTransaction = await request(app.getHttpServer())
      .get(`/transactions`)
      .set('Authorization', `Bearer ${userToken}`)
      .send()
      .expect(200);

    expect(existingTransaction.body).toHaveProperty('meta');
    expect(existingTransaction.body).toHaveProperty('links');
    expect(existingTransaction.body).toHaveProperty('data');
    expect(existingTransaction.body.data).toHaveLength(2);
  });

  it("should be able to list a user's transactions with type filter", async () => {
    const existingTransaction = await request(app.getHttpServer())
      .get(`/transactions`)
      .query({ type: TransactionType.INCOME })
      .set('Authorization', `Bearer ${userToken}`)
      .send()
      .expect(200);

    expect(existingTransaction.body).toHaveProperty('meta');
    expect(existingTransaction.body).toHaveProperty('links');
    expect(existingTransaction.body).toHaveProperty('data');
    expect(existingTransaction.body.data).toHaveLength(1);
  });

  it("should be able to list a user's transactions with description filter", async () => {
    const existingTransaction = await request(app.getHttpServer())
      .get(`/transactions`)
      .query({ description: 'filter' })
      .set('Authorization', `Bearer ${userToken}`)
      .send()
      .expect(200);

    expect(existingTransaction.body).toHaveProperty('meta');
    expect(existingTransaction.body).toHaveProperty('links');
    expect(existingTransaction.body).toHaveProperty('data');
    expect(existingTransaction.body.data).toHaveLength(1);
  });

  it("should be able to list a user's transactions with date filter", async () => {
    const existingTransaction = await request(app.getHttpServer())
      .get(`/transactions`)
      .query({
        month: futurePaymentDate.getMonth() + 1,
        year: futurePaymentDate.getFullYear(),
      })
      .set('Authorization', `Bearer ${userToken}`)
      .send()
      .expect(200);

    expect(existingTransaction.body).toHaveProperty('meta');
    expect(existingTransaction.body).toHaveProperty('links');
    expect(existingTransaction.body).toHaveProperty('data');
    expect(existingTransaction.body.data).toHaveLength(1);
  });

  it("should not be able to list a user's transactions when sending invalid date", async () => {
    await request(app.getHttpServer())
      .get(`/transactions`)
      .query({
        month: 13,
        year: 2,
      })
      .set('Authorization', `Bearer ${userToken}`)
      .send()
      .expect(400)
      .then(response => {
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('errors');
      });
  });

  it("should not be able to list a user's transactions when sending invalid type", async () => {
    await request(app.getHttpServer())
      .get(`/transactions`)
      .query({
        type: 'INVALID_TYPE',
      })
      .set('Authorization', `Bearer ${userToken}`)
      .send()
      .expect(400)
      .then(response => {
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('errors');
      });
  });

  it('should not be able to list transactions when not authenticated', async () => {
    await request(app.getHttpServer()).get(`/transactions`).send().expect(401);
  });
});
