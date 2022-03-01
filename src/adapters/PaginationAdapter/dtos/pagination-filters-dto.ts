import { IsNumberString } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationFiltersDTO {
  @ApiPropertyOptional()
  @IsNumberString()
  page?: number;

  @ApiPropertyOptional()
  sort?: string;

  @ApiPropertyOptional()
  order?: string;
}
