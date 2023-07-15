import { ControlValidators } from '@finance/core';

export const accountBalanceValidation = ControlValidators.number('Money', {
  required: true
});
