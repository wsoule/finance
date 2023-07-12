import { Field, InputType } from 'type-graphql';
import { extendValidation, ControlValidators, FormGroupValidation } from '@finance/core';

import { InputBase } from '@finance/node';

@InputType()
export class UserForgotPasswordInput extends InputBase{
  @Field()
  username!: string;

   protected getValidation<T extends object = this>(): FormGroupValidation<T> | null;
   protected getValidation(): FormGroupValidation<UserForgotPasswordInput> | null {
    return extendValidation(super.getValidation(), {
      children: {
        username: ControlValidators.string('Username', {
          maxlength: 30,
          minlength: 3,
          required: true
        })
      }
    });
   }
}
