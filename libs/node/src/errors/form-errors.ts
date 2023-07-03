import { BaseError } from './base-error';
import { FormErrorMessages } from '@finance/core';

export class FormError extends BaseError {
  override readonly name = 'FormError';

  constructor(formErrors: FormErrorMessages<any>, message?: string) {
    super(message ?? 'Invalid values provided.', 422, { code: 'FORM_ERROR', formControl: formErrors });
  }
}