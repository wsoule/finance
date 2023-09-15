import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Account, Transaction, TransactionType } from '../entities';
import { AppContext } from '../types';
import { AuthenticationError, FormError } from '@finance/node';
import {
  AccountUpdateBalanceInput,
  TransactionFindInput,
  TransactionInput,
  TransactionPageInput,
  TransactionsWithCount
} from './types/';
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
    const { userID } = request.session;
    if (!userID) {
      throw new AuthenticationError('Must Be Logged In to Create Transaction');
    }

    const existingAccount = await Account.findOneBy({ userID });
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

  @Mutation(() => Transaction)
  async transactionDelete(
    @Arg('input') input: TransactionFindInput,
    @Ctx() { request, redis, response }: AppContext
  ): Promise<Transaction> {
    input.throwIfInvalid();
    const { userID } = request.session;
    const existingTransaction = await Transaction.findOneBy({ id: input.transactionID });
    if (!existingTransaction) {
      throw new FormError({
        control: [ `Cannot Find Transaction ID: ${input.transactionID}` ]
      });
    }
    if (!userID) {
      throw new AuthenticationError('Must Be Logged In to Create Transaction');
    }

    const existingAccount = await Account.findOneBy({ userID });
    if (!existingAccount) {
      throw new FormError({
        control: [ 'Account Not Found!' ]
      });
    }

    const account = new AccountResolver();
    const accountUpdateInput = new AccountUpdateBalanceInput();
    accountUpdateInput.balance = existingAccount.balance - (existingTransaction.amount);
    await account.accountUpdateBalance(accountUpdateInput, { redis, request, response });

    await Transaction.delete({ id: input.transactionID });
    return existingTransaction;
  }

  @Query(() => TransactionsWithCount, { nullable: true })
  async transactionDetailsArray(
    @Arg('input') input: TransactionPageInput,
    @Ctx() { request }: AppContext
  ): Promise<TransactionsWithCount | null> {
    input.throwIfInvalid();
    const { userID } = request.session;
    if (!userID) {
      throw new AuthenticationError('Must Be Logged In To Get Transaction');
    }
    const existingAccount = await Account.findOneBy({ userID });
    if (!existingAccount) {
      throw new FormError({
        control: [ 'Account Not Found!' ]
      });
    }
    // gets an array of transactions with length dependent on the page number & page size
    const [ transactionsArray, transactionsCount ] = await Transaction.findAndCount({
      order: {
        updatedAt: 'DESC'
      },
      where: {
        accountId: existingAccount.id
      },
      take: input.pageNumber * 2
    });
    if (!transactionsArray) {
      throw new FormError({
        control: [ 'Transaction Not Found!' ]
      });
    }
    return { transactionsArray, transactionsCount };
  }


  @Query(() => [ Transaction ])
  async transactionDetails(
    @Ctx() { request }: AppContext
  ): Promise<Transaction[]> {
    const { userID } = request.session;
    if (!userID) {
      throw new AuthenticationError('Must Be Logged In To Get Transaction');
    }
    const existingAccount = await Account.findOneBy({ userID });
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
