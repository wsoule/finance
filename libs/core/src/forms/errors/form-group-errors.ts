import { FormArrayErrors } from './form-array-errors';
import { FormControlErrors } from './form-control-errors';
import { FormErrors } from './form-errors';

export interface FormGroupErrors<T> extends FormControlErrors {
  children?: { [k in keyof(T)]?: FormErrors<T[k]>; };
}

export namespace FormGroupErrors {
  export function isInstance<T>(errors: any): errors is FormGroupErrors<T> {
    if (!FormControlErrors.isInstance(errors)) {
      return false;
    }

    const children = (errors as FormArrayErrors<any> | FormGroupErrors<T> | null)?.children;

    return (
      typeof children === 'object'
      && !(children instanceof Array)
      && Object.values(children).every((child): boolean => FormControlErrors.isInstance(child))
    );
  }
}
