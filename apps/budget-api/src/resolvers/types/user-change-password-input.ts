import { Field, InputType } from 'type-graphql';
import { extendValidation, FormGroupValidation } from '@finance/core';

import { UserChangePasswordTokenCheckInput } from './user-change-password-token-check-input';
import { passwordValidation } from './validation';

@InputType()
export class UserChangePasswordInput extends UserChangePasswordTokenCheckInput {
  @Field()
  password!: string;

   protected getValidation<T extends object = this>(): FormGroupValidation<T> | null;
   protected getValidation(): FormGroupValidation<UserChangePasswordInput> | null {
       return extendValidation(super.getValidation(), {
        children: {
          password: passwordValidation
        }
       });
   }
}
