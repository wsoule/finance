import { Field, InputType } from 'type-graphql';
import { InputBase } from '@finance/node';
import { extendValidation, FormGroupValidation } from '@finance/core';
import { transactionTypeValidation } from './validation';

@InputType()
export class TransactionTypeInput extends InputBase {
  @Field()
  transactionType!: string;

  protected getValidation<T extends object = this>(): FormGroupValidation<T> | null;
  protected getValidation(): FormGroupValidation<TransactionTypeInput> | null {
    return extendValidation(super.getValidation(), {
      children: {
        transactionType: transactionTypeValidation
      }
    });
  }
}
