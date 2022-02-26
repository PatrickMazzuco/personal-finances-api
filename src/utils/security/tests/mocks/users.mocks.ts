import { v4 as uuid } from 'uuid';

import { User } from '@modules/users/entities/user';
import { CreateUserDTO } from '@modules/users/repositories/dtos/create-user.dto';

export function userEntityMock(): User {
  return {
    id: uuid(),
    name: 'John Doe',
    email: 'jhondoe@email.com',
    password: '123456',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function createUserMock(): CreateUserDTO {
  return {
    name: 'John Doe',
    email: 'jhondoe@email.com',
    password: '123456',
  };
}
