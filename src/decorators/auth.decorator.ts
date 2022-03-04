import { JwtAuthGuard } from '@modules/auth/guards/jwt.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export function JwtAuth() {
  return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth());
}
