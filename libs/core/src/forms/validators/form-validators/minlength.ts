import { Keyed } from '../../../types';
import { MinlengthError } from '../errors';
import { FormValidator } from '../form-validator';
import { requiredValidator } from './required';

export const minlengthValidator: ((minlength: number) => FormValidator<string>) & Keyed = (minlength: number) => {
  return (value): [string, MinlengthError] | null => {
    return (requiredValidator(value) || value.length >= minlength)
      ? null
      : [minlengthValidator.key, { length: value.length, minlength }];
  };
};

minlengthValidator.key = 'minlength';
