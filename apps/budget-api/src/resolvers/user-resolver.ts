import {
  Arg,
  Query,
  Resolver
} from 'type-graphql';
import { User } from '../entities';
import { UserDetailsInput } from './types';

const fakeUsers = [
  { id: '123', username: 'foob'},
  { id: '456', username: 'user-2'},
  { id: '789', username: 'user-3'}
].map(({ id, username }) => {
  const user = new User();
  user.id = id;
  user.email = `${username}@foo.bar`;
  user.username = username;
  return user;
});

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async userDetails(
    @Arg('input')
    input: UserDetailsInput
  ): Promise<User | null> {
    const user = fakeUsers.find((u) => u.username === input.username);

    return user ?? null;
  }
}