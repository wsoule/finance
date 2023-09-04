import { ControlValidators, extendValidation, FormGroupValidation } from '@finance/core';
import { InputBase } from '@finance/node';
import { Field, InputType } from 'type-graphql';

@InputType()
export class TransactionPageInput extends InputBase {
  @Field()
  pageNumber!: number;

  protected getValidation<T extends object = this>(): FormGroupValidation<T> | null;
  protected getValidation(): FormGroupValidation<TransactionPageInput> | null {
    return extendValidation(super.getValidation(), {
      children: {
        pageNumber: ControlValidators.number('pageNumber', {
          min: 1,
          required: true
        })}
    });
  }
}
