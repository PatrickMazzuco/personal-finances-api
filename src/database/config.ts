import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

import { getEnvFile } from '@config/env';

const envFilePath = getEnvFile();

dotenv.config({
  path: envFilePath,
});

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOSTNAME, DB_PORT } = process.env;

export const getDatabaseConfig = (): ConnectionOptions => ({
  type: 'postgres',
  host: DB_HOSTNAME,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
});
