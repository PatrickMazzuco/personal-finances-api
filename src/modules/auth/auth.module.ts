import { getJwtConfig } from '@config/jwt';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthenticateController } from './use-cases/authenticate/authenticate.controller';
import { AuthenticateService } from './use-cases/authenticate/authenticate.service';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register(getJwtConfig())],
  controllers: [AuthenticateController],
  providers: [JwtStrategy, AuthenticateService],
  exports: [AuthenticateService],
})
export class AuthModule {}
