import { Keyed } from '../../../types';
import { MaxlengthError } from '../errors';
import { FormValidator } from '../form-validator';
import { requiredValidator } from './required';

export const maxlengthValidator: ((maxlength: number) => FormValidator<string>) & Keyed = (maxlength: number) => {
  return (value): [string, MaxlengthError] | null => {
    return (requiredValidator(value) || value.length <= maxlength)
      ? null
      : [maxlengthValidator.key, { length: value.length, maxlength }];
  };
};

maxlengthValidator.key = 'maxlength';
