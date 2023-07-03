import { FormValidator, Validators } from '../../validators';
import { FormControlValidation } from '../types';

export interface VaidateNumberControlConfig {
  max?: number;
  min?: number;
  required?: true;
}

export function validateNumberControl(
  label: string,
  {
    max,
    min,
    required
  }: VaidateNumberControlConfig
): FormControlValidation<number> {
  const validators: FormValidator<number>[] = [];

  if (max != null) {
    validators.push(Validators.max(max));
  }

  if (min != null) {
    validators.push(Validators.min(min));
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