import { User } from './user';
import { Account } from './account';
import { Transaction } from './transaction';

export * from './user';
export * from './account';
export * from './transaction';

export const entities = [
  User,
  Account,
  Transaction
];
