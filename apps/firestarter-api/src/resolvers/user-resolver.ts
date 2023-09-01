import { default as argon2 } from 'argon2';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { v4 } from 'uuid';
import { User } from '../entities';
import { AppContext, RedisKey } from '../types';
import {
  UserChangePasswordInput, UserChangePasswordTokenCheckInput, UserCreateInput, UserForgotPasswordInput, UserLoginInput
} from './types';
import { environment } from '../environments';
import { FormError, sendEmail, Time } from '@finance/node';
import { AccountResolver } from './account-resolver';

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async userChangePassword(
    @Arg('input') input: UserChangePasswordInput,
    @Ctx() { redis, request }: AppContext
  ): Promise<User> {
    input.throwIfInvalid();
    const { password, token } = input;
    const user = await this.getUserFromChangePasswordToken(token, redis);
    if (!user) {
      throw new FormError({
        children: {
          token: {
            control: [
              'Invalid token, please request to change your password again.'
            ]
          }
        }
      });
    }

    await User.update({ id: user.id }, {
      password: await this.hashPassword(password)
    });

    // log user in
    request.session.userID = user.id;

    await redis.del(`${RedisKey.forgotPassword}:${token}`);
    await sendEmail({
      from: 'firestarter@finance.com',
      html: [
        'Your password has been successfully updated!'
      ].join('\n'),
      subject: 'Password Change Complete',
      to: user.email,
      text: 'test2'
    });

    return user;
  }

  @Query(() => Boolean)
  async userChangePasswordTokenCheck(
    @Arg('input') input: UserChangePasswordTokenCheckInput,
    @Ctx() { redis }: AppContext
  ): Promise<boolean> {
    input.throwIfInvalid();
    return !!await this.getUserFromChangePasswordToken(input.token, redis);
  }

  @Mutation(() => User)
  async userCreate(
    @Arg('input') input: UserCreateInput,
    @Ctx() { request, redis, response }: AppContext
  ): Promise<User> {
    input.throwIfInvalid();
    const { email, password, username } = input;

    const existingUser = await User.findOneBy({
      username,
      // email: username,
      email
      // username: email
    });
    if (existingUser) {
      throw new FormError({
        children: {
          username: {
            control: [
              'Username and/or Email already exists!'
            ]
          }
        }
      });
    }

    const user = User.create({
      email,
      password: await this.hashPassword(password),
      username
    });
    await user.save();

    request.session.userID = user.id;

    const account = new AccountResolver();
    await account.accountCreate({ request, redis, response });

    return user;
  }

  @Query(() => User, { nullable: true })
  async userDetails(
    @Ctx() { request }: AppContext
  ): Promise<User | null> {
    const { userID } = request.session;
    return (!userID) ? null : User.findOneBy({ id: userID });
  }

  @Mutation(() => Boolean)
  async userForgotPassword(
    @Arg('input') input: UserForgotPasswordInput,
    @Ctx() { redis }: AppContext
  ): Promise<true> {
    input.throwIfInvalid();
    const { username } = input;
    const user = await User.findOneBy({ username });
    if (!user) {
      throw new FormError({
        children: {
          username: {
            control: [
              'Username does not exist!'
            ]
          }
        }
      });
    }
    const token = v4();
    await redis.set(
      `${RedisKey.forgotPassword}:${token}`,
      user.id,
      'EX',
      Time.converters.fromDay(3)
    );
    await sendEmail({
      from: 'firestarter@finance.com',
      html: [
        `<a href="${environment.urls.local}/change-password/${token}">Change Password</a>`
      ].join('\n'),
      subject: 'password Change Request',
      to: user.email,
      text: 'hello'
    });
    console.log(`${environment.urls.local}/change-password/${token}`);

    return true;
  }

  @Mutation(() => User)
  async userLogin(
    @Arg('input') input: UserLoginInput,
    @Ctx() { request }: AppContext
  ): Promise<User> {
    input.throwIfInvalid();
    const { password, username } = input;
    const existingUser = await User.findOneBy({ username });
    if (!existingUser || !await argon2.verify(existingUser.password, password)) {
      throw new FormError({
        control: [ 'Invalid username or password' ]
      });
    }
    request.session.userID = existingUser.id;

    return existingUser;
  }

  @Mutation(() => Boolean)
  userLogout(
    @Ctx() { request, response }: AppContext
  ): Promise<boolean> {
    return new Promise((resolve) => {
      request.session.destroy((error) => {
        response.clearCookie(environment.session.cookieName);
        if (error) {
          console.warn('error', error);
        }
        resolve(!error);
      });
    });
  }

  /** Get the user for the provided token if the token and user exist. */
  protected async getUserFromChangePasswordToken(token: string, redis: AppContext['redis']): Promise<User | null> {
    const userId = await redis.get(`${RedisKey.forgotPassword}:${token}`);
    return (!userId) ? null : await User.findOneBy({ id: userId });
  }

  /** Hashes the provided password before it is stored in the database. */
  protected hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }
}
