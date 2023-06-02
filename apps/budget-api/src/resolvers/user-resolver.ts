import {
  Arg,
  Query,
  Resolver
} from 'type-graphql';
import { User } from '../entities';
import { UserDetailsInput } from './types';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async userDetails(
    @Arg('input')
    input: UserDetailsInput
  ): Promise<User | null> {
    const { username } = input;

    return await User.findOne({ where: { username }});
  }
}