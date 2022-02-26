import { UserDTO } from '@modules/users/dtos/user.dto';
import { PickType } from '@nestjs/swagger';

export class FindUserDTO extends PickType(UserDTO, ['id']) {}
