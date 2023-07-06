import { createStandaloneToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useUserChangePasswordTokenCheckQuery } from '../generated/graphql';

export const useChangePasswordGuard = (): boolean | null => {
  const router = useRouter();
  const [ success, setSuccess ] = useState<boolean | null>(null);
  const token = router.query.token as string ?? 'abc';
  const [ { data, fetching } ] = useUserChangePasswordTokenCheckQuery({ variables: { input: { token } } });

  const { toast } = createStandaloneToast();

  useEffect(() => {
    const newSuccess = (fetching || !router.isReady) ? null : !!data?.userChangePasswordTokenCheck;
    if (newSuccess == false) {
      toast({
        isClosable: true,
        status: 'error',
        title: 'Invalid token, please request a new one.'
      });
      router.push('/forgot-password');
    }
    setSuccess(newSuccess);
  }, [ data, fetching, router ]);

  return success;
};
