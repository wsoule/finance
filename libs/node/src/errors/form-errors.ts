import { BaseError, ErrorCode } from './base-error';
import { FormErrorMessages } from '@finance/core';

export class FormError extends BaseError {
  override readonly name = 'FormError';

  constructor(formErrors: FormErrorMessages<any>, message?: string) {
    console.log('form error', formErrors, message);
    super(message ?? 'Invalid values provided.', ErrorCode.formError, { formControl: formErrors });
  }
}
