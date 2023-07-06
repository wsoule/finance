import { FormArrayValidation } from './form-array-validation';
import { FormControlValidation } from './form-control-validation';
import { FormValidation } from './form-validation';

export interface FormGroupValidation<T extends object> extends FormControlValidation<T> {
  children?: {
    [K in keyof(T)]?: FormValidation<T[K]>;
  };
}

export namespace FormGroupValidation {
  export function isInstance<T extends object>(validation: any): validation is FormGroupValidation<T> {
    if (!FormControlValidation.isInstance(validation)) {
      return false;
    }

    const children = (validation as FormArrayValidation<any> | FormGroupValidation<T> | null)?.children;

    return children == null || (
      typeof children === 'object'
    && !(children instanceof Array)
    && Object.values(children).every((child): boolean => FormControlValidation.isInstance(child))
    );
  }
}
