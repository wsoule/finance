import { Field, InputType } from 'type-graphql';
import { extendValidation, ControlValidators, FormGroupValidation } from '@finance/core';

import { InputBase } from './input-base';

@InputType()
export class UserChangePasswordTokenCheckInput extends InputBase {
  @Field()
  token!: string;

   protected getValidation<T extends object = this>(): FormGroupValidation<T> | null;
   protected getValidation(): FormGroupValidation<UserChangePasswordTokenCheckInput> | null {
    return extendValidation(super.getValidation(), {
      children: {
        token: ControlValidators.string('Token', {
          required: true
        })
      }
    });
   }
}
