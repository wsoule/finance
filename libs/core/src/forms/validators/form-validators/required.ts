import { Keyed } from '../../../types';
import { FormValidator } from '../form-validator';

export const requiredValidator: FormValidator<any> & Keyed = (value) => {
  return (value != null && value !== '') ? null : [requiredValidator.key, true];
};

requiredValidator.key = 'required';
