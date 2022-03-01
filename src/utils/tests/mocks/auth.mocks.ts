import { AuthenticationBodyDTO } from '@modules/auth/use-cases/authenticate/dtos/authentication-body.dto';

export function authenticationBodyMock(): AuthenticationBodyDTO {
  return {
    email: 'jhondoe@email.com',
    password: '123456',
  };
}
