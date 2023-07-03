import { Keyed } from '../../../types';
import { FormValidator } from '../form-validator';
import { patternValidatorBase } from './pattern-base'

type EmailValidator = ((patternOverride?: RegExp) => FormValidator<string>) & Keyed;

export const emailValidator: EmailValidator = (patternOverride) => {
  return patternValidatorBase(emailValidator.key, patternOverride ?? /^[^@]+@[^@]+\.[^@]/))
}

emailValidator.key = 'email';