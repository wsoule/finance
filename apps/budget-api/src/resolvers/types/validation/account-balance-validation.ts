import { ControlValidators } from '@finance/core';

export const accountBalanceValidation = ControlValidators.number('number', {
  required: true
});
