import { Keyed } from '../../../types';
import { PatternsError } from '../errors';
import { FormValidator } from '../form-validator';
import { requiredValidator } from './required';

export type PatternsValidatorConfig<KeysT extends string> = Record<KeysT, RegExp>;

type PatternsValidator = (<T extends string>(config: PatternsValidatorConfig<T>) => FormValidator<string>) & Keyed;

export const patternsValidator: PatternsValidator = <T extends string>(
  config: PatternsValidatorConfig<T>
): FormValidator<string> => {
  return (value): [string, PatternsError<T>] | null => {
    if (requiredValidator(value)) {
      return null;
    }

    const invalidPatterns: Partial<Record<T, RegExp>> = {};
    let isInvalid = false;
    (Object.entries(config) as [T, RegExp][]).forEach(([key, pattern]): void => {
      if (!pattern.test(value)) {
        invalidPatterns[key] = pattern;
        isInvalid = true;
      }
    });

    return (isInvalid) ? [patternsValidator.key, { patterns: invalidPatterns, value }] : null;
  };
};

patternsValidator.key = 'patterns';
