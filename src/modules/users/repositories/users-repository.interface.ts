import { User } from '../entities/user';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  findOne(id: string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  update(id: string, data: UpdateUserDTO): Promise<void>;
  truncateTable(): Promise<void>;
}
