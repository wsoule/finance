import { ControlValidators, extendValidation, FormGroupValidation } from '@finance/core';
import { InputBase } from '@finance/node';
import { Field, Float, InputType } from 'type-graphql';
import { AccountUpdateBalanceInput } from './account-update-balance-input';
import { transactionTypeValidation } from './validation';

@InputType()
export class TransactionInput extends InputBase {
  @Field(() => Float)
  amount!: AccountUpdateBalanceInput['balance'];

  // TODO - create validation that the transactionType string has the values that are in transaction-type table
  @Field()
  transactionType!: string;

  protected getValidation<T extends object = this>(): FormGroupValidation<T> | null;
  protected getValidation(): FormGroupValidation<TransactionInput> | null {
    return extendValidation(super.getValidation(), {
      children: {
        amount: ControlValidators.number('Amount', {
          required: true,
          cannotBeZero: true
        }),
        transactionType: transactionTypeValidation
      }
    });
  }
}
