import { Arg, Mutation, Resolver } from 'type-graphql';
import { TransactionType } from '../entities';
import { NewTransactionTypeInput } from './types';
import { FormError } from '@finance/node';
import { EditTransactionType } from './types/edit-transaction-type';

@Resolver()
export class TransactionTypeResolver {
  @Mutation(() => TransactionType)
  async transactionTypeCreate(
    @Arg('newTransactionType') newTransactionType: NewTransactionTypeInput
  ): Promise<TransactionType> {
    newTransactionType.throwIfInvalid();
    const { transactionType } = newTransactionType;
    if (await TransactionType.findOneBy({ transactionType })) {
      throw new FormError({
        control: [ `TransactionType '${transactionType}' Already Created!` ]
      });
    }
    const createdTransactionType = TransactionType.create({
      transactionType
    });
    await createdTransactionType.save();

    return createdTransactionType;
  }

  @Mutation(() => TransactionType)
  async transactionTypeEdit(
    @Arg('editedTransactionType') editedTransactionType: EditTransactionType
  ): Promise<TransactionType | null> {
    editedTransactionType.throwIfInvalid();
    const { transactionType: newTransactionType, transactionTypeID } = editedTransactionType;
    if (!await TransactionType.findOneBy({ id: transactionTypeID })) {
      throw new FormError({
        control: [ `TransactionTypeID '${transactionTypeID}' Not Found!` ]
      });
    }
    if (await TransactionType.findOneBy({ transactionType: newTransactionType })) {
      throw new FormError({
        control: [ `TransactionType '${newTransactionType}' is Already Created!` ]
      });
    }
    await TransactionType.update({ id: transactionTypeID }, {
      transactionType: newTransactionType
    });
    return await TransactionType.findOneBy({ id: transactionTypeID });
  }
}
