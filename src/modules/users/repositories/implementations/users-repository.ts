import { User } from '@modules/users/entities/user';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';

import { CreateUserDTO } from '../dtos/create-user.dto';
import { IUsersRepository } from '../users-repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}
  async create(data: CreateUserDTO): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data,
    });

    return createdUser;
  }

  async findOne(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(data: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: data.id },
      data,
    });
  }
}
