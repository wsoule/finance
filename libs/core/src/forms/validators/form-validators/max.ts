import { Keyed } from '../../../types';
import { MaxError } from '../errors';
import { FormValidator } from '../form-validator';
import { requiredValidator } from './required';

export const maxValidator: ((max: number) => FormValidator<number>) & Keyed = (max: number) => {
  return (value): [string, MaxError] | null => {
    return (requiredValidator(value) || value <= max)
      ? null
      : [maxValidator.key, { max, value }];
  };
};

maxValidator.key = 'max';