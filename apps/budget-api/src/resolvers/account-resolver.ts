import {
  Ctx,
  Mutation,
  Query,
  Resolver
} from 'type-graphql';

import { Account, User } from '../entities';
import { AppContext } from '../types';
import { FormError } from '@finance/node';

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
        control: ['Account Already Created']
      });
    } else if (!existingUser) {
      throw new FormError({
        control: [ 'User Not Found' ]
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
    console.log('userId', userId);
    const existingAccount = await Account.findOne({ where: [ { userId } ] });
    console.log('after', existingAccount);

    if (!existingAccount) {
      throw new FormError({
        control: [ 'Account Not Found' ]
      });
    }

    console.log('existingAccount', existingAccount);
    return existingAccount;

  }
}
