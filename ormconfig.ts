import { getDatabaseConfig } from '@src/database/config';

export default {
  ...getDatabaseConfig(),
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/modules/**/entities/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/modules/**/entities',
  },
};
