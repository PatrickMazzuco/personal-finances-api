import { v4 as uuid } from 'uuid';

import { User } from '@modules/users/entities/user.entity';
import { CreateUserDTO } from '@modules/users/repositories/dtos/create-user.dto';
import { UpdateUserDTO } from '@modules/users/use-cases/update-user/dtos/update-user.dto';

export function userEntityMock(): User {
  return {
    id: uuid(),
    name: 'John Doe',
    email: 'jhondoe@email.com',
    password: '123456',
    transactions: [],
    recurringTransactions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function createUserMock(): CreateUserDTO {
  const { name, email, password } = userEntityMock();
  return {
    name,
    email,
    password,
  };
}

export function updateUserMock(): UpdateUserDTO {
  const { id, name, email, password } = userEntityMock();
  return {
    id,
    name,
    email,
    password,
  };
}
