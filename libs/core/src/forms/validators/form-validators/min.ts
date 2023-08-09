import { Keyed } from '../../../types';
import { MinError } from '../errors';
import { FormValidator } from '../form-validator';
import { requiredValidator } from './required';

export const minValidator: ((min: number) => FormValidator<number>) & Keyed = (min: number) => {
  return (value): [string, MinError] | null => {
    return (requiredValidator(value) || value >= min)
      ? null
      : [minValidator.key, { min, value }];
  };
};

minValidator.key = 'min';
