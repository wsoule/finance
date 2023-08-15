import { FormValidator, Validators } from '../../validators';
import { FormControlValidation } from '../types';

export interface VaidateNumberControlConfig {
  cannotBeZero?: true;
  max?: number;
  min?: number;
  required?: true;
}

export function validateNumberControl(
  label: string,
  {
    cannotBeZero,
    max,
    min,
    required
  }: VaidateNumberControlConfig
): FormControlValidation<number> {
  const validators: FormValidator<number>[] = [];

  if (cannotBeZero) {
    validators.push(Validators.cannotBeZero);
  }

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