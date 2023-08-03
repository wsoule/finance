import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Account, Transaction, User } from '../entities';
import { AppContext } from '../types';
import { AuthenticationError, FormError } from '@finance/node';
import { TransactionInput } from './types/';

@Resolver()
export class TransactionResolver {
  @Mutation(() => Transaction)
  async transactionCreate(
    @Arg('input') input: TransactionInput,
    @Ctx() { request }: AppContext
    ): Promise<Transaction> {
    input.throwIfInvalid();
    const { amount } = input;
    const { userId } = request.session;

    if (!userId) {
      throw new AuthenticationError('Must Be Logged In to Create Transaction');
    }

    const [ existingAccount, existingUser ] = await Promise.all([
      Account.findOne({ where: [{ userId }]}),
      User.findOne({ where: [{ id: userId }]})
    ]);

    if (!existingAccount) {
      throw new FormError({
        control: [ 'Account Not Found!' ]
      });
    } else if (!existingUser) {
      throw new FormError({
        control: [ 'User Not Found!' ]
      });
    }
    
    const transaction = Transaction.create({
      amount,
      accountId: existingAccount.id
    });

    await transaction.save();

    return transaction;
  }
}
