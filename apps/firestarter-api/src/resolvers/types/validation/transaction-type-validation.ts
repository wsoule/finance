import { ControlValidators } from '@finance/core';

export const transactionTypeValidation = ControlValidators.string('transaction type', {
  required: true
});
