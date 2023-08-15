import { ControlValidators } from '@finance/core';

export const transactionTypeValidation = ControlValidators.string('TransactionType', {
  required: true
});
