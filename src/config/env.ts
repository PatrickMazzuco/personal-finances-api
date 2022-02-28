type EnvFiles =
  | '.env.development'
  | '.env.test'
  | '.env.sandbox'
  | '.env.production';

export function getEnvFile(): EnvFiles {
  switch (process.env.NODE_ENV) {
    case 'test':
      return '.env.test';
    case 'sandbox':
      return '.env.sandbox';
    case 'production':
      return '.env.production';
    default:
      return '.env.development';
  }
}
