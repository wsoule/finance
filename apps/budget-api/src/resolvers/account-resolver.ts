import { Account, User } from '../entities';
import { AuthenticationError, FormError } from '@finance/node';
import { AppContext } from '../types';
import { AccountUpdateBalanceInput } from './types';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class AccountResolver {
  /** Creates a new account. */
  @Mutation(() => Account)
  async accountCreate(
    @Ctx() { request }: AppContext
  ): Promise<Account> {
    const { userId } = request.session;
    if (!userId) {
      throw new AuthenticationError('You Must Be Logged In To Create Account');
    }
    const [ existingAccount, existingUser ] = await Promise.all([
      Account.findOneBy({ userId }),
      User.findOneBy({ id: userId })
    ]);
    if (existingAccount) {
      throw new FormError({
        control: [ 'Account Already Created!' ]
      });
    } else if (!existingUser) {
      throw new FormError({
        control: [ 'User Not Found!' ]
      });
    }
    const account = Account.create({
      balance: 0,
      userId: userId
    });

    await account.save();

    return account;
  }

  /** Get details of the user's account. */
  @Query(() => Account, { nullable: true })
  async accountDetails(
    @Ctx() { request }: AppContext
  ): Promise<Account> {
    const { userId } = request.session;
    if (!userId) {
      throw new AuthenticationError('You Must Be Logged In To Access Account!');
    }
    const existingAccount = await Account.findOneBy({ userId });
    if (!existingAccount) {
      throw new FormError({
        control: [ 'Account Not Found!' ]
      });
    }

    return existingAccount;
  }

  /** Updates the users balance with inputted amount. */
  @Mutation(() => Account)
  async accountUpdateBalance(
    @Arg('input') input: AccountUpdateBalanceInput,
    @Ctx() { request }: AppContext
  ): Promise<Account> {
    input.throwIfInvalid();
    const { balance } = input;
    const { userId } = request.session;
    if (!userId) {
      throw new AuthenticationError('You must Be Logged In Update Account!');
    }
    let account = await Account.findOneBy({ userId });
    if (!account) {
      throw new FormError({
        control: [ 'Account Not Found!' ]
      });
    }
    await Account.update({
      userId
    }, {
      balance
    });
    account = await Account.findOneBy({ userId }) ?? account;

    return account;
  }
}
