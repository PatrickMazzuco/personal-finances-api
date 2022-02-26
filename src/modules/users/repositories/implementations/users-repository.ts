import { User } from '@modules/users/entities/user';
import { Injectable } from '@nestjs/common';

import { CreateUserDTO } from '../dtos/create-user.dto';
import { IUsersRepository } from '../users-repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  create(data: CreateUserDTO): Promise<User> {
    console.log(data);
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Promise<User> {
    console.log({ id });
    throw new Error('Method not implemented.');
  }

  findOneByEmail(email: string): Promise<User> {
    console.log({ email });
    throw new Error('Method not implemented.');
  }
}
