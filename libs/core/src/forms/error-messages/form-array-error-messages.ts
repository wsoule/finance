import { FormControlErrorMessages } from './form-control-error-messages';
import { FormErrorMessages } from './form-error-messages';
import { FormGroupErrorMessages } from './form-group-error-messages';

export interface FormArrayErrorMessages<T> extends FormControlErrorMessages {
  children?: ((FormErrorMessages<T[keyof(T)]> | null)[] | null);
}

export namespace FormArrayErrorMessages {
  export function isInstance<T extends any[] = unknown[]>(
    validation: any
  ): validation is FormArrayErrorMessages<T> {
    if (!FormControlErrorMessages.isInstance(validation)) {
      return false;
    }

    const children = (validation as FormArrayErrorMessages<T> | FormGroupErrorMessages<any> | null)?.children;

    return children == null || (
      children instanceof Array
      && children.every((child): boolean => FormControlErrorMessages.isInstance(child))
    );
  }
}
