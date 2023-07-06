import {
  FormArrayErrors,
  FormControlError,
  FormGroupErrors,
  FormErrors
} from '../errors';
import {
  FormArrayValidation,
  FormGroupValidation,
  FormValidation
} from '../validation';

export function runValidation<T>(validation: FormValidation<T>, value: T): FormErrors<T> | null {
  const errors = {} as unknown as FormErrors<T>;

  if (validation.control) {
    const control = validation.control.validators?.map((validator): FormControlError | null =>
      validator(value)
    ).filter((error): boolean =>
      !!error
    ) as FormControlError[];

    if (control.length) {
      errors.control = control;
    }
  }

  if (FormArrayValidation.isInstance(validation) && validation.children && value instanceof Array) {
    const children = validation.children?.map((childControl, childKey) => {
      return runValidation<T[keyof(T)]>(childControl as FormValidation<T[keyof(T)]>, value[childKey]);
    });
    if (children?.length) {
      (errors as FormArrayErrors<T>).children = children;
    }
  } else if (FormGroupValidation.isInstance(validation) && validation.children && typeof value === 'object') {
    const childrenControls = (Object.entries(validation.children ?? {}) as [keyof(T), FormValidation<T[keyof(T)]>][]);
    const children = childrenControls.reduce((
      childrenErrors,
      [childKey, childControl]
    ) => {
      const childErrors = runValidation(childControl, value![childKey]);
      if (childErrors != null) {
        childrenErrors![childKey] = childErrors;
      }
      return childrenErrors;
    }, {} as unknown as FormGroupErrors<T>['children']);

    if (Object.keys(children ?? {}).length) {
      (errors as FormGroupErrors<T>).children = children;
    }
  }

  return Object.keys(errors).length ? errors : null;
}
