import { FormControlValidation } from './form-control.validation';
import { FormGroupValidation} from './form-group-validation';
import { FormValidation } from './form-validation';

export interface FormArrayValidation<T extends any[]> extends FormControlValidation<T> {
  children?: FormValidation<T[keyof(T)]>[];
}

export namespace FormArrayValidation {
  export function isInstance<T extends any[] = unknown[]>(
    validation: any
  ): validation is FormArrayValidation<T> {
    if (!FormControlValidation.isInstance(validation)) {
      return false;
    }

    const children = (validation as FormArrayValidation<T> | FormGroupValidation<any> | null)?.children;

    return children == null || (
      children instanceof Array
      && children.every((child): boolean => FormControlValidation.isInstance(child))
    );
  }
}
