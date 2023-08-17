import { Field, InputType } from 'type-graphql';
import { InputBase } from '@finance/node';
import { ControlValidators, extendValidation, FormGroupValidation } from '@finance/core';

@InputType()
export class GetTransactionTypeInput extends InputBase {
  @Field()
  transactionTypeID!: number;

  protected getValidation<T extends object = this>(): FormGroupValidation<T> | null;
  protected getValidation(): FormGroupValidation<GetTransactionTypeInput> | null {
    return extendValidation(super.getValidation(), {
      children: {
        transactionTypeID: ControlValidators.number('TransactionTypeID', {
          required: true
        })
      }
    });
  }
}
