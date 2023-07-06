import { FormValidator, Validators } from '../../validators';
import { FormControlValidation } from '../types';

export interface ValidateStringControlConfig {
  email?: boolean;
  maxlength?: number;
  minlength?: number;
  pattern?: RegExp;
  required?: true;
}

export function validateStringControl(
  label: string,
  {
    email,
    maxlength,
    minlength,
    pattern,
    required
  }: ValidateStringControlConfig
): FormControlValidation<string> {
  const validators: FormValidator<string>[] = [];

  if (email) {
    validators.push(Validators.email());
  }

  if (maxlength != null) {
    if (maxlength > 0) {
      validators.push(Validators.maxlength(maxlength));
    } else {
      throw new Error(`validateStringContro; was provided an invalid maxlength '${maxlength}'`);
    }
  }

  if (minlength != null) {
    if (minlength > 0) {
      validators.push(Validators.minlength(minlength));
    } else {
      throw new Error(`validateStringControl was provided an invalid minlength '${minlength}'`);
    }
  }

  if (pattern) {
    validators.push(Validators.pattern(pattern));
  }

  if (required) {
    validators.push(Validators.required);
  }

  return {
    control: {
      label,
      validators
    }
  };
}
