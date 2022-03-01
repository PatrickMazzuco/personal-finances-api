import { Repository } from 'typeorm';

import { User } from '@modules/users/entities/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { IUsersRepository } from '../users-repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}
  async create(data: CreateUserDTO): Promise<User> {
    const createdUser = await this.repository.save(data);

    return createdUser;
  }

  async findOne(id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }

  async update(id: string, data: UpdateUserDTO): Promise<void> {
    await this.repository.update(id, data);
  }

  async truncateTable(): Promise<void> {
    await this.repository.query('DELETE FROM users');
  }
}
