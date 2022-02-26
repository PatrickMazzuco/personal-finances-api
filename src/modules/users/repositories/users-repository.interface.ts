import { UserDTO } from '../dtos/user.dto';
import { CreateUserDTO } from './dtos/create-user.dto';

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<UserDTO>;
  findOne(id: string): Promise<UserDTO>;
}
