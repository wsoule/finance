import { Arg, Mutation, Resolver } from 'type-graphql';
import { TransactionType } from '../entities';
import { TransactionTypeInput } from './types';
import { FormError } from '@finance/node';

@Resolver()
export class TransactionTypeResolver {
  @Mutation(() => TransactionType)
  async transactionTypeCreate(
    @Arg('input') input: TransactionTypeInput
  ): Promise<TransactionType> {
    input.throwIfInvalid();
    const { transactionType } = input;
    const existingTransactionType = await TransactionType.findOne({ where: [ { transactionType } ] });
    if (existingTransactionType) {
      throw new FormError({
        control: [ `TransactionType '${transactionType}' Already Created!` ]
      });
    }
    const newTransactionType = TransactionType.create({
      transactionType
    });
    await newTransactionType.save();

    return newTransactionType;
  }
}
