import { Keyed } from '../../../types';
import { FormValidator } from '../form-validator';
import { patternValidatorBase } from './pattern-base';

export const patternValidator: ((pattern: RegExp) => FormValidator<string>) & Keyed = (pattern) => {
  return patternValidatorBase(patternValidator.key, pattern);
};

patternValidator.key = 'pattern';
