import { createStandaloneToast } from '@chakra-ui/toast';
import { default as Router } from 'next/router';
import { Exchange } from 'urql';
import { pipe, tap } from 'wonka';

import { isAuthenticationError } from '@finance/react';

export const authenticationErrorExchange: Exchange = ({ forward }) => ops$ => {
  const { toast } = createStandaloneToast();
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      const authenticationError = error?.graphQLErrors.find((error) => isAuthenticationError(error));
      if (!authenticationError) {
        return;
      }

      toast({
        isClosable: true,
        status: 'error',
        title: authenticationError.message
      });
      Router.replace('/login');
    })
  );
};
