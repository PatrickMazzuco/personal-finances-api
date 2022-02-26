import { User } from '../entities/user';
import { CreateUserDTO } from './dtos/create-user.dto';

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  findOne(id: string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  update(data: User): Promise<void>;
}
