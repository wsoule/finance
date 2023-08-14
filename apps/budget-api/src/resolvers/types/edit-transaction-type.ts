import { Field, InputType } from 'type-graphql';
import { NewTransactionTypeInput } from './new-transaction-type-input';
import { ControlValidators, extendValidation, FormGroupValidation } from '@finance/core';

@InputType()
export class EditTransactionType extends NewTransactionTypeInput {
  @Field()
  transactionTypeID!: number;

  protected getValidation<T extends object = this>(): FormGroupValidation<T> | null;
  protected getValidation(): FormGroupValidation<EditTransactionType> | null {
    return extendValidation(super.getValidation(), {
      children: {
        transactionTypeID: ControlValidators.number('TransactionTypeID', {
          required: true
        })
      }
    });
  }

}
