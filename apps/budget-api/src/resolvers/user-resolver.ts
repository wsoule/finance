import { default as argon2 } from 'argon2';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver
} from 'type-graphql';
import { User } from '../entities';
import { AppContext, BaseError, ErrorCode } from '../types';
import {
  UserCreateInput,
  UserDetailsInput,
  UserLoginInput
 } from './types';
 import { environment } from '../environments';
import { FindOptionsWhere } from 'typeorm';

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async userCreate(
    @Arg('input') input: UserCreateInput,
    @Ctx() { request }: AppContext
  ): Promise<User> {
    const { email, password, username } = input;

    const existingUser = await User.findOne({ where: [
      { username },
      { email: username },
      { email },
      { username: email }
    ]});
    if (existingUser) {
      throw new BaseError(
        'Username and/or Email already exists.',
        ErrorCode.badUserInput
      );
    }

    const user = User.create({
      email,
      password: await this._hashPassword(password),
      username
    });
    await user.save();

    request.session.userId = user.id;

    return user;
  }

  @Query(() => User, { nullable: true })
  async userDetails(
    @Arg('input', () => UserDetailsInput, { nullable: true })
    input: UserDetailsInput | null,
    @Ctx() { request }: AppContext
  ): Promise<User | null> {
    const { username } = input ?? {};
    const { userId } = request.session;

    let where: FindOptionsWhere<User>| null = null;

    if (username) {
      where = { username }; //shorthand for { username: username }
    } else if (userId) {
      where = { id: userId };
    }

    return (!where) ? null : User.findOne({ where });

  }

  @Mutation(() => User)
  async userLogin(
    @Arg('input') input: UserLoginInput,
    @Ctx() { request }: AppContext
  ): Promise<User> {
    const { password, username } =input;
    const existingUser = await User.findOne({ where: [
      { username },
      { email: username }
    ]});

    if (!existingUser || !await argon2.verify(existingUser.password, password)) {
      throw new FormError(
        'Invalid username or password',
        ErrorCode.badUserInput
      );
    }

    request.session.userId = existingUser.id;

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

  private _hashPassword(plainTextPassword: string): Promise<string> {
    return argon2.hash(plainTextPassword);
  }
}