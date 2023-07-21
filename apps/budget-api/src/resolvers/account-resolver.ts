import {
    Arg,
  Ctx,
  Mutation,
  Query,
  Resolver
} from 'type-graphql';

import { Account, User } from '../entities';
import { AppContext } from '../types';
import { FormError } from '@finance/node';
import { AccountUpdateBalance } from './types/account-update-balance-input';

@Resolver()
export class AccountResolver {
  @Mutation(() => Account)
  async accountCreate(
    @Ctx() { request }: AppContext
    ): Promise<Account> {
    const { userId } = request.session;
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
    const existingAccount = await Account.findOne({ where: [ { userId } ] });

    if (!existingAccount) {
      throw new FormError({
        control: [ 'Account Not Found!' ]
      });
    }

    return existingAccount;
  }

/** updates the users balance with inputed amount. */
  @Mutation(() => Number)
  async updateBalance(
    @Arg('input') input: AccountUpdateBalance,
    @Ctx() { request }: AppContext
  ): Promise<number> {
    input.throwIfInvalid();
    const { balance } = input;
    const { userId } = request.session;
    const account = await Account.findOne({ where: [ { userId } ] });

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

    return balance;
    }
}
