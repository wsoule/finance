import { ControlValidators } from '@finance/core';

export const accountBalanceValidation = ControlValidators.number('balance', {
  required: true
});
