import { Field, InputType } from 'type-graphql';

@InputType()
export class UserDetailsInput {
  @Field()
  username!: string;
}