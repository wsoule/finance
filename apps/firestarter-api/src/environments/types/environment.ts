import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface Environment {
  databaseOptions: PostgresConnectionOptions;
  isProd: boolean;
  session: {
    cookieName: string;
    secret: string;
  };
  urls: {
   web: string;
  };
}
