import { Field, InputType } from 'type-graphql';
import { extendValidation, FormGroupValidation } from '@finance/core';

import { InputBase } from '@finance/node';
import { accountBalanceValidation } from './validation';

@InputType()
export class AccountCreateInput extends InputBase{
  @Field()
  balance!: number;

   protected getValidation<T extends object = this>(): FormGroupValidation<T> | null;
   protected getValidation(): FormGroupValidation<AccountCreateInput> | null {
    return extendValidation(super.getValidation(), {
      children: {
        balance: accountBalanceValidation
      }
    });
  }
}
