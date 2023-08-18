import { createStandaloneToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useUserDetailsQuery } from '../generated/graphql';

export const useAuthenticatedGuard = (): boolean | null => {
  const router = useRouter();
  const [ success, setSuccess ] = useState<boolean | null>(null);
  const [ { data, fetching } ] = useUserDetailsQuery();

  useEffect(() => {
    const checkAuthentication = async (): Promise<void> => {
      const { toast } = createStandaloneToast();
      const newSuccess = (fetching) ? null : data?.userDetails != null;
      if (newSuccess == false) {
        toast({
          isClosable: true,
          status: 'error',
          title: 'Please log in to access this route.'
        });
        await router.push(`/?route=${router.asPath}`);
      }
      setSuccess(newSuccess);
    };
    checkAuthentication();
  }, [ fetching, data?.userDetails, router ]);

  return success;
};
