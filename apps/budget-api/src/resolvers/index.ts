import { AccountResolver } from './account-resolver';
import { UserResolver } from './user-resolver';
import { TransactionResolver } from './transaction-resolver';
import { TransactionTypeResolver } from './transaction-type-resolver';

export const resolvers = [
  AccountResolver,
  UserResolver,
  TransactionResolver,
  TransactionTypeResolver
] as const;
