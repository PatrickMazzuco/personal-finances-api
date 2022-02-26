import { UserDTO } from '@modules/users/dtos/user.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateUserParamsDTO extends PickType(UserDTO, ['id']) {}
