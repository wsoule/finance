import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface Environment {
  databaseOptions: PostgresConnectionOptions;
}
