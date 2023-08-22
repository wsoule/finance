import { extendValidation, FormGroupValidation } from '@finance/core';
import { InputBase } from '@finance/node';
import { Field, InputType } from 'type-graphql';
import { passwordValidation, usernameValidation } from './validation';

@InputType()
export class UserLoginInput extends InputBase {
  @Field()
  password!: string;
  @Field()
  username!: string;

  protected getValidation<T extends object = this>(): FormGroupValidation<T> | null;
  protected getValidation(): FormGroupValidation<UserLoginInput> | null {
    return extendValidation(super.getValidation(), {
      children: {
        password: passwordValidation,
        username: usernameValidation
      }
    });
  }
}
