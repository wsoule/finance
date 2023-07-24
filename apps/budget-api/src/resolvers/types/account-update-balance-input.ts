import { Field, InputType } from 'type-graphql';
import { ControlValidators, extendValidation, FormGroupValidation } from '@finance/core';

import { InputBase } from '@finance/node';
// import { accountBalanceValidation } from './validation';

@InputType()
export class AccountUpdateBalanceInput extends InputBase{
  @Field()
  balance!: number;

   protected getValidation<T extends object = this>(): FormGroupValidation<T> | null;
   protected getValidation(): FormGroupValidation<AccountUpdateBalanceInput> | null {
    return extendValidation(super.getValidation(), {
      children: {
        balance: ControlValidators.number('balance', {
          required: true
        })
      }
    });
  }
}
