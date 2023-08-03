import { Account, User } from '../entities';
import { AuthenticationError, FormError } from '@finance/node';
import { AppContext } from '../types';
import { AccountUpdateBalanceInput } from './types/account-update-balance-input';
import {
    Arg,
  Ctx,
  Mutation,
  Query,
  Resolver
} from 'type-graphql';

@Resolver()
export class AccountResolver {
  @Mutation(() => Account)
  async accountCreate(
    @Ctx() { request }: AppContext
    ): Promise<Account> {
    const { userId } = request.session;
    
    if (!userId) {
      throw new AuthenticationError('You Must Be Logged In To Create Account');
    }

    const  [ existingAccount, existingUser ] = await Promise.all([
      Account.findOne({ where: [{ userId }] }),
      User.findOne({ where: [ { id: userId } ] })
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

  @Query(() => Account, { nullable: true })
  async accountDetails(
    @Ctx() { request }: AppContext
    ): Promise<Account | null> {
    const { userId } = request.session;
    if(!userId) {
      throw new AuthenticationError('You Must Be Logged In To Access Account!');
    }
    const existingAccount = await Account.findOne({ where: [ { userId } ] });
    if (!existingAccount) {
      throw new FormError({
        control: [ 'Account Not Found!' ]
      });
    }

    return existingAccount;
  }

/** Updates the users balance with inputed amount. */
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

    let account = await Account.findOne({ where: [ { userId } ] });

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
    account = await Account.findOne({ where: [ { userId } ] }) ?? account;

    return account;
    }
}
