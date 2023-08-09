import { Keyed } from '../../../types';
import { FormValidator } from '../form-validator';

export const cannotBeZeroValidator: FormValidator<number> & Keyed = (value) => {
  return (value !== 0) ? null : [cannotBeZeroValidator.key, true];
};

cannotBeZeroValidator.key = 'cannotBeZero';
