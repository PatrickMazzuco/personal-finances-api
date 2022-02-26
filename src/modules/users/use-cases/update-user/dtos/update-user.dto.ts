import { IntersectionType } from '@nestjs/swagger';

import { UpdateUserBodyDTO } from './update-user-body.dto';
import { UpdateUserParamsDTO } from './update-user-params.dto';

export class UpdateUserDTO extends IntersectionType(
  UpdateUserParamsDTO,
  UpdateUserBodyDTO,
) {}
