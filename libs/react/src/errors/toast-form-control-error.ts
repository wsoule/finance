import { useToast, UseToastOptions } from '@chakra-ui/toast';
import { OperationResult} from 'urql';

import {
  FormErrorMessages,
  FormGroupErrorMessages
} from '@finance/core';
import { isFormError } from './is-form-error';

export function toastFormControlError(
  result: OperationResult,
  toast: ReturnType<typeof useToast>,
  controlName: string,
  controlLabel: string
): boolean {
  let controlErrors: FormErrorMessages<any> | null = null;
  result.error?.graphQLErrors.forEach((graphQlError): void => {
    const _toastConfig: Partial<UseToastOptions> | null = null;
    if (isFormError(graphQlError)) {
      const formErrors = graphQlError.extensions.formControlError as FormGroupErrorMessages<any>;
      controlErrors = (formErrors.children && formErrors.children[controlName]) || null;
      if (controlErrors) {
        toast({
          description: controlErrors?.control?.join('\t\n'),
          title: `Invalid value provided for ${controlLabel}.`,
          isClosable: true,
          status: 'error'
        });
      }
    }
  });

  return !controlErrors;
}
