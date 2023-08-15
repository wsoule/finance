import { ControlValidators } from '@finance/core';

export const passwordValidation = ControlValidators.string('Password', {
  maxlength: 100,
  minlength: 8,
  required: true
});
