import { ControlValidators, extendValidation, FormGroupValidation } from '@finance/core';
import { Field, InputType } from 'type-graphql';
import { InputBase } from '@finance/node';

@InputType()
export class TransactionFindInput extends InputBase {
  @Field()
  transactionID!: string;

  protected getValidation<T extends object = this>(): FormGroupValidation<T> | null;
  protected getValidation(): FormGroupValidation<TransactionFindInput> | null {
    return extendValidation(super.getValidation(), {
      children: {
        transactionID: ControlValidators.string('transactionID', {
          required: true
        })
      }
    });
  }
}
