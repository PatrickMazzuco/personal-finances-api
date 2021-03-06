import { UserErrors } from '@modules/users/errors/user.errors';
import { UsersRepository } from '@modules/users/repositories/implementations/users-repository';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { updateUserMock, userEntityMock } from '@utils/tests/mocks/users.mocks';

import { UpdateUserService } from '../update-user.service';

describe('UpdateUserService', () => {
  let app: INestApplication;

  let updateUserService: UpdateUserService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    updateUserService = module.get<UpdateUserService>(UpdateUserService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to update an existing user', async () => {
    const user = userEntityMock();
    const updatedUserData = updateUserMock();

    jest
      .spyOn(UsersRepository.prototype, 'findOne')
      .mockResolvedValueOnce(user);

    jest
      .spyOn(UsersRepository.prototype, 'findOneByEmail')
      .mockResolvedValueOnce(null);

    jest.spyOn(UsersRepository.prototype, 'update').mockResolvedValueOnce();

    await expect(
      updateUserService.execute(updatedUserData),
    ).resolves.not.toThrow();
  });

  it("should not be able to change an user's email to an existing email", async () => {
    const user = userEntityMock();
    const anotherUser = {
      ...userEntityMock(),
      id: 'another-user-id',
    };
    const updatedUserData = updateUserMock();

    jest
      .spyOn(UsersRepository.prototype, 'findOne')
      .mockResolvedValueOnce(user);

    jest
      .spyOn(UsersRepository.prototype, 'findOneByEmail')
      .mockResolvedValueOnce(anotherUser);

    jest.spyOn(UsersRepository.prototype, 'update').mockResolvedValueOnce();

    await expect(
      updateUserService.execute(updatedUserData),
    ).rejects.toBeInstanceOf(UserErrors.DuplicatedEmail);
  });

  it('should not be able to update an inexistent user', async () => {
    const updatedUserData = updateUserMock();

    jest
      .spyOn(UsersRepository.prototype, 'findOne')
      .mockResolvedValueOnce(null);

    await expect(
      updateUserService.execute(updatedUserData),
    ).rejects.toBeInstanceOf(UserErrors.NotFound);
  });
});
