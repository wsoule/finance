import { FormErrorMessages } from '../error-messages';
import { FormErrors } from '../errors';
import { FormValidation } from '../validation';
import { runValidation } from './run-validation';
import { defaultErrorProcessor } from './default-error-processor';
import { requireErrorsProcessor } from './require-errors-processor';

export interface CreateValidatorConfig<T> {
  errorsProcessor?: (errors: FormErrors<T>) => FormErrorMessages<T>;
  validationProcessor?: (validation: FormValidation<T>, value: T) => FormErrors<T> | null;
}

export function createValidator<T>(
  validation: FormValidation<T>,
  { errorsProcessor, validationProcessor }: CreateValidatorConfig<T> = {}
): (value: T) => FormErrorMessages<T> | null {
  return (value) => {
    validationProcessor ??= runValidation;
    errorsProcessor ??= (errors): FormErrorMessages<T> => requireErrorsProcessor(validation, errors, defaultErrorProcessor);

    const errors = validationProcessor(validation, value);
    return (errors == null) ? null : errorsProcessor(errors);
  };
}
