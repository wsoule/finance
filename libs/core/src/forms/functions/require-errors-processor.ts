import {
  FormArrayErrorMessages,
  FormErrorMessages,
  FormGroupErrorMessages
} from '../error-messages';
import {
  FormArrayErrors,
  FormControlError,
  FormControlErrors,
  FormErrors,
  FormGroupErrors
} from '../errors';
import {
  FormArrayValidation,
  FormGroupValidation,
  FormValidation
} from '../validation';

export function requireErrorsProcessor<T>(
  validation: FormValidation<T>,
  errors: FormErrors<T>,
  errorProcessor: (control: FormValidation<any>, error: FormControlError) => string | null
): FormErrorMessages<T> {
  const errorMessages = {} as unknown as FormErrorMessages<T>;

  if (errors.control) {
    errorMessages.control = errors.control.map((error): string => {
      const message = errorProcessor(validation, error);
      if (message == null) {
        throw new Error(`requireErrorProcessor: missing message for error (${JSON.stringify(error)})`);
      }
      return message;
    });
  }

  if (FormArrayValidation.isInstance<unknown[]>(validation) && FormArrayErrors.isInstance(errors)) {
    const childrenErrors = (errors.children as (FormControlErrors | null)[]);
    const childrenValidation = validation.children as FormValidation<T[keyof(T)]>[];
    (errorMessages as FormArrayErrorMessages<T>).children = childrenErrors.map((childErrors, childKey) => {
      return (childErrors == null) ? null : requireErrorsProcessor<T[keyof(T)]>(
        childrenValidation[childKey],
      childErrors as unknown as FormErrors<T[keyof(T)]>,
      errorProcessor
      );
    });
  } else if (
    FormGroupValidation.isInstance(validation)
    && validation.children
    && FormGroupErrors.isInstance(errors)
  ) {
    const childrenErrors = Object.entries(errors.children ?? {}) as [keyof(T), FormErrors<T[keyof(T)]>][];
    const childrenValidation = validation.children;
    (errorMessages as FormGroupErrorMessages<T>).children = childrenErrors.reduce((childrenMessages, [childkey, childErrors]) => {
      childrenMessages[childkey] = requireErrorsProcessor<T[keyof(T)]>(
        (childrenValidation as T)[childkey] as unknown as FormValidation<T[keyof(T)]>,
      childErrors, errorProcessor
      );
      return childrenMessages;
    }, {} as unknown as Required<FormGroupErrorMessages<T>>['children']);
  }

  return errorMessages;
}
