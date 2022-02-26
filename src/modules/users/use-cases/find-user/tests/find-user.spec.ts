import { UserErrors } from '@modules/users/errors/user.errors';
import { UsersRepository } from '@modules/users/repositories/implementations/users-repository';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { userEntityMock } from '@utils/security/tests/mocks/users.mocks';

import { FindUserService } from '../find-user.service';

describe('FindUserService', () => {
  let app: INestApplication;

  let findUserService: FindUserService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    findUserService = module.get<FindUserService>(FindUserService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to find an existing user', async () => {
    const user = userEntityMock();

    jest
      .spyOn(UsersRepository.prototype, 'findOne')
      .mockResolvedValueOnce(user);

    const existing = await findUserService.execute({ id: user.id });

    expect(existing).toMatchObject(user);
  });

  it('should not be able to find an inexistent user', async () => {
    const user = userEntityMock();

    jest
      .spyOn(UsersRepository.prototype, 'findOne')
      .mockResolvedValueOnce(null);

    await expect(
      findUserService.execute({ id: user.id }),
    ).rejects.toBeInstanceOf(UserErrors.NotFound);
  });
});
