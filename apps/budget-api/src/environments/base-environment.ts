import { Environment } from './types';

function getEnvVariable(variableName: string): string {
  const value = process.env[variableName];
  if (!value?.trim()) {
    throw new Error(`Environment variable '${variableName} is not set.`);
  }

  return value;
}

type BaseKeys = 'databaseOptions' | 'isProd' | 'session' | 'urls';

export const baseEnvironment: Pick<Environment, BaseKeys> = {
  databaseOptions: {
    database: 'finance',
    host: 'localhost',
    logging: false,
    password: getEnvVariable('FINANCE_SQL_DATABASE_PASSWORD'),
    port: 5432,
    synchronize: true,
    type: 'postgres',
    username: getEnvVariable('FINANCE_SQL_DATABASE_USERNAME')
  },
  isProd: false,
  session: {
    cookieName: 'session',
    secret: getEnvVariable('EXPRESS_SESSION_SECRET')
  },
  urls: {
    local: 'http://localhost:4200',
    dev: '',
    prod: ''
  }
};
