import { ControlValidators, extendValidation, FormGroupValidation } from '@finance/core';
import { InputBase } from '@finance/node';
import { Field, InputType } from 'type-graphql';
import { transactionTypeValidation } from './validation';

@InputType()
export class TransactionInput extends InputBase {
  @Field()
  amount!: number;

  @Field()
  transactionType!: string;

  protected getValidation<T extends object = this>(): FormGroupValidation<T> | null;
  protected getValidation(): FormGroupValidation<TransactionInput> | null {
    return extendValidation(super.getValidation(), {
      children: {
        amount: ControlValidators.number('amount', {
          cannotBeZero: true,
          required: true
        }),
        transactionType: transactionTypeValidation
      }
    });
  }
}
