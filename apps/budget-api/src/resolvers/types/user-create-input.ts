import { Field, InputType } from 'type-graphql';
import { UserLoginInput } from './user-login-input';

@InputType()
export class UserCreateInput extends UserLoginInput {
  @Field()
  email!: string;
}
