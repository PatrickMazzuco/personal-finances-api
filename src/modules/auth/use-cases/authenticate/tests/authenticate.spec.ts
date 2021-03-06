import { AuthErrors } from '@modules/auth/errors/auth.errors';
import { IPasswordHash } from '@modules/users/providers/password-hash.provider';
import { UsersRepository } from '@modules/users/repositories/implementations/users-repository';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { ProviderToken } from '@src/shared/enums/provider-token.enum';
import { userEntityMock } from '@utils/tests/mocks/users.mocks';

import { AuthenticateService } from '../authenticate.service';

describe('AuthenticateService', () => {
  let app: INestApplication;

  let authenticateService: AuthenticateService;
  let passwordHash: IPasswordHash;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    authenticateService = module.get<AuthenticateService>(AuthenticateService);
    passwordHash = module.get<IPasswordHash>(ProviderToken.PASSWORD_HASH);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {
    const user = userEntityMock();

    const credentials = {
      email: user.email,
      password: user.password,
    };

    const hashedPassword = await passwordHash.hash(user.password);
    user.password = hashedPassword;

    jest
      .spyOn(UsersRepository.prototype, 'findOneByEmail')
      .mockResolvedValueOnce(user);

    const createdUser = await authenticateService.execute(credentials);

    expect(createdUser).toHaveProperty('accessToken');
  });

  it('should not be able to authenticate with an incorrect email', async () => {
    const user = userEntityMock();

    const credentials = {
      email: user.email,
      password: user.password,
    };

    jest
      .spyOn(UsersRepository.prototype, 'findOneByEmail')
      .mockResolvedValueOnce(null);

    await expect(
      authenticateService.execute(credentials),
    ).rejects.toBeInstanceOf(AuthErrors.InvalidCredentials);
  });

  it('should not be able to authenticate with an incorrect password', async () => {
    const user = userEntityMock();

    const credentials = {
      email: user.email,
      password: 'wrong-password',
    };

    const hashedPassword = await passwordHash.hash(user.password);
    user.password = hashedPassword;

    jest
      .spyOn(UsersRepository.prototype, 'findOneByEmail')
      .mockResolvedValueOnce(user);

    await expect(
      authenticateService.execute(credentials),
    ).rejects.toBeInstanceOf(AuthErrors.InvalidCredentials);
  });
});
