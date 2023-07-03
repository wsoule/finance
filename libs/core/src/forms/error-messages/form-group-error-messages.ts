import { FormControlErrorMessages } from './form-control-error-messages';
import { FormArrayErrorMessages } from './form-array-error-messages';
import { FormErrorMessages } from './form-error-messages';

export interface FormGroupErrorMessages<T> extends FormControlErrorMessages {
  children?: {
    [K in keyof(T)]?: FormErrorMessages<T[K]>;
  };
}

export namespace FormGroupErrorMessages {
  export function isInstance<T>(validation: any): validation is FormGroupErrorMessages<T> {
    if (!FormControlErrorMessages.isInstance(validation)) {
      return false;
    }

    const children = (validation as FormArrayErrorMessages<any> | FormGroupErrorMessages<T> | null)?.children;

    return children == null || (
      typeof children === 'object'
      && !(children instanceof Array)
      && Object.values(children).every((child): boolean => FormControlErrorMessages.isInstance(child))
    );
  }
}
