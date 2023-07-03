import { PatternError } from '../errors';
import { FormValidator } from '../form-validator';
import { requiredValidator } from './required';

type PatternValidatorBase = (key: string, pattern: RegExp) => FormValidator<string>;

export const patternValidatorBase: PatternValidatorBase = (key, pattern): FormValidator<string> => {
  return (value): [string, PatternError] | null => {
    return (requiredValidator(value) || pattern.test(value)) ? null : [key, { pattern, value }];
  };
};
