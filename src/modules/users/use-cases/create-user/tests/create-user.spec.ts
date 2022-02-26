import { UserErrors } from '@modules/users/errors/user.errors';
import { UsersRepository } from '@modules/users/repositories/implementations/users-repository';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import {
  createUserMock,
  userEntityMock,
} from '@utils/security/tests/mocks/users.mocks';

import { CreateUserService } from '../create-user.service';

describe('CreateUserService', () => {
  let app: INestApplication;

  let createUserService: CreateUserService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    createUserService = module.get<CreateUserService>(CreateUserService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a new user', async () => {
    const user = userEntityMock();
    const newUserData = createUserMock();

    jest
      .spyOn(UsersRepository.prototype, 'findOneByEmail')
      .mockResolvedValueOnce(null);

    jest.spyOn(UsersRepository.prototype, 'create').mockResolvedValueOnce(user);

    const createdUser = await createUserService.execute(newUserData);

    expect(createdUser).toMatchObject(user);
  });

  it('should not be able to create a user with duplicated email', async () => {
    const user = userEntityMock();
    const newUserData = createUserMock();

    jest
      .spyOn(UsersRepository.prototype, 'findOneByEmail')
      .mockResolvedValueOnce(user);

    await expect(createUserService.execute(newUserData)).rejects.toBeInstanceOf(
      UserErrors.DuplicatedEmail,
    );
  });
});
