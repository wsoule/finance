import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Account, Transaction, TransactionType } from '../entities';
import { AppContext } from '../types';
import { AuthenticationError, FormError } from '@finance/node';
import { AccountUpdateBalanceInput, TransactionInput } from './types/';
import { AccountResolver } from './account-resolver';

@Resolver()
export class TransactionResolver {
  @Mutation(() => Transaction)
  async transactionCreate(
    @Arg('input') input: TransactionInput,
    @Ctx() { request, redis, response }: AppContext
  ): Promise<Transaction> {
    input.throwIfInvalid();
    const { amount, transactionType } = input;
    const { userId } = request.session;
    if (!userId) {
      throw new AuthenticationError('Must Be Logged In to Create Transaction');
    }

    const existingAccount = await Account.findOneBy({ userId });
    if (!existingAccount) {
      throw new FormError({
        control: [ 'Account Not Found!' ]
      });
    }

    const existingTransactionType = await TransactionType.findOneBy({ transactionType });
    if (!existingTransactionType) {
      throw new FormError({
        control: [ `Transaction Type '${transactionType}' not found!` ]
      });
    }
    const transaction = Transaction.create({
      amount,
      accountId: existingAccount.id,
      transactionTypeID: existingTransactionType.id
    });
    const account = new AccountResolver();
    const accountInput = new AccountUpdateBalanceInput();
    accountInput.balance = parseFloat(existingAccount.balance.toString()) + (amount);
    await account.accountUpdateBalance(accountInput, { redis, request, response });

    await transaction.save();

    return transaction;
  }

  @Query(() => [ Transaction ])
  async transactionDetails(
    @Ctx() { request }: AppContext
  ): Promise<Transaction[]> {
    const { userId } = request.session;
    if (!userId) {
      throw new AuthenticationError('Must Be Logged In To Get Transaction');
    }
    const existingAccount = await Account.findOneBy({ userId });
    if (!existingAccount) {
      throw new FormError({
        control: [ 'Account Not Found!' ]
      });
    }
    const existingTransaction = await Transaction.find({
      order: {
        updatedAt: 'DESC'
      }, where: { accountId: existingAccount.id }
    });
    if (!existingTransaction) {
      throw new FormError({
        control: [ 'Transaction Not Found!' ]
      });
    }
    return existingTransaction;
  }
}
