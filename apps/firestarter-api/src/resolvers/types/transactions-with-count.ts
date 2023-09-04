import {
  Field,
  Int,
  ObjectType
} from 'type-graphql';
import { Transaction } from '../../entities';

@ObjectType()
export class TransactionsWithCount {
  @Field(() => [Transaction])
  transactionsArray!: Transaction[];

  @Field(() => Int)
  transactionsCount!: number;
}