import { GraphQLError } from 'graphql';

import { FormErrorMessages } from '../../forms';

// TODO: Methods like this belong on the error classes as `isInstance` methods.
export function isFormError<T = any>(
  error: GraphQLError
  ): error is GraphQLError & { extensions: { formControlError: FormErrorMessages<T>; } } {
  return error && error.extensions.code === 'FORM_ERROR';
}