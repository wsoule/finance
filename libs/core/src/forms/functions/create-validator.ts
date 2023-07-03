import { FormErrorMessages } from '../error-messages';
import { FormErrors } from '../errors';
import { FormValidation } from '../validation';
import { runValidation } from './run-validation';
import { defaultErrorProcessor } from './default-error-processor';
import { requireErrorsProcessor } from './require-erros-processor';

export interface CreateValidatoryConfig<T> {
  errorsProcessor?: (errors: FormErrors<T>) => FormErrorMessages<T>;
  
}