import { Field, InputType } from 'type-graphql';
import { extendValidation, FormGroupValidation } from '@finance/core';
import { InputBase } from '@finance/node';
import { usernameValidation } from './validation';

@InputType()
export class UserForgotPasswordInput extends InputBase {
  @Field()
  username!: string;

  protected getValidation<T extends object = this>(): FormGroupValidation<T> | null;
  protected getValidation(): FormGroupValidation<UserForgotPasswordInput> | null {
    return extendValidation(super.getValidation(), {
      children: {
        username: usernameValidation
      }
    });
  }
}
