import { FormControlError } from './form-control-error';

export interface FormControlErrors {
  control?: FormControlError[];
}

export namespace FormControlErrors {
  export function isInstance(
    errors: any
  ): errors is FormControlErrors {
    if (!errors || typeof errors !== 'object') {
      return false;
    }

    const control = (errors as FormControlErrors | null)?.control;

    return !control || (
      control instanceof Array
      && control.every((error) => FormControlError.isInstance(error))
    );
  }
}
