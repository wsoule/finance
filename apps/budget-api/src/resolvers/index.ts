import { AccountResolver } from './account-resolver';
import { UserResolver } from './user-resolver';
import { TransactionResolver } from './transaction-resolver';

export const resolvers = [
  AccountResolver,
  UserResolver,
  TransactionResolver
] as const;
