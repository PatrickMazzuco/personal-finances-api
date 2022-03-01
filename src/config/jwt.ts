import * as dotenv from 'dotenv';

import { getEnvFile } from '@config/env';
import { JwtModuleOptions } from '@nestjs/jwt';

const envFilePath = getEnvFile();
const DEFAULT_JWT_SECRET = 'secret';
const DEFAULT_JWT_EXPIRES_IN = '1h';

dotenv.config({
  path: envFilePath,
});

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const secret = JWT_SECRET || DEFAULT_JWT_SECRET;
const expiresIn = JWT_EXPIRES_IN || DEFAULT_JWT_EXPIRES_IN;

export const getJwtConfig = (): JwtModuleOptions => ({
  secret,
  signOptions: {
    expiresIn,
  },
});
