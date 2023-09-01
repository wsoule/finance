import { ControlValidators } from '@finance/core';

export const usernameValidation = ControlValidators.string('username', {
  maxlength: 30,
  minlength: 3,
  required: true
});
