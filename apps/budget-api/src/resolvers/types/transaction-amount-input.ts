import { ControlValidators, FormGroupValidation, extendValidation } from '@finance/core';
import { InputBase } from '@finance/node';
import { Field, InputType } from 'type-graphql';

@InputType()
export class TransactionInput extends InputBase {
  @Field()
  amount!: number;

  protected getValidation<T extends object = this>(): FormGroupValidation<T> | null;
  protected getValidation(): FormGroupValidation<TransactionInput> | null {
    return extendValidation(super.getValidation(), {
      children: {
        amount: ControlValidators.number('Amount', {
          min: 0.01
        })
      }
    });
  }
}
