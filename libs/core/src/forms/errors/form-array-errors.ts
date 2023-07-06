import { FormControlErrors } from './form-control-errors';
import { FormErrors } from './form-errors';
import { FormGroupErrors } from './form-group-errors';

export interface FormArrayErrors<T> extends FormControlErrors {
  children?: (FormErrors<T[keyof(T)]> | null)[];
}

export namespace FormArrayErrors {
  export function isInstance<T extends any[] = unknown[]>(errors: any): errors is FormArrayErrors<T> {
    if (!FormControlErrors.isInstance(errors)) {
      return false;
    }

    const children = (errors as FormArrayErrors<T> | FormGroupErrors<any> | null)?.children;

    return (
      children instanceof Array
      && children.every((child): boolean => FormControlErrors.isInstance(child))
    );
  }
}
