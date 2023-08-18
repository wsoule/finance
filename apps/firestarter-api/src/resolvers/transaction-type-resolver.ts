import {
  Arg,
  Mutation,
  Query,
  Resolver
} from 'type-graphql';
import { TransactionType } from '../entities';
import {
  EditTransactionTypeInput,
  GetTransactionTypeInput,
  NewTransactionTypeInput
} from './types';
import { FormError } from '@finance/node';

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
    @Arg('editedTransactionType') editedTransactionType: EditTransactionTypeInput
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

  @Query(() => TransactionType, { nullable: true })
  async transactionTypeDetails(
    @Arg('getTransactionTypeInput') getTransactionTypeInput: GetTransactionTypeInput
  ): Promise<TransactionType> {
    getTransactionTypeInput.throwIfInvalid();
    const { transactionTypeID } = getTransactionTypeInput;
    const existingTransactionType = await TransactionType.findOneBy({ id: transactionTypeID });
    if (!existingTransactionType) {
      throw new FormError({
        control: [ `TransactionTypeID ${transactionTypeID} Not Found!` ]
      });
    }
    return existingTransactionType;
  }

  @Query(() => [ TransactionType ], { nullable: true })
  async transactionTypeList(): Promise<TransactionType[]> {
    return await TransactionType.find();
  }
}
