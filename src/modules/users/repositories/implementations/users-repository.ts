import { UserDTO } from '@modules/users/dtos/user.dto';
import { Injectable } from '@nestjs/common';

import { CreateUserDTO } from '../dtos/create-user.dto';
import { IUsersRepository } from '../users-repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  create(data: CreateUserDTO): Promise<UserDTO> {
    console.log(data);
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Promise<UserDTO> {
    console.log({ id });
    throw new Error('Method not implemented.');
  }
}
