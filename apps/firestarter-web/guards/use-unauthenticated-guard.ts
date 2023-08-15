import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useUserDetailsQuery } from '../generated/graphql';

export const useUnauthenticatedGuard = (): boolean | null => {
  const router = useRouter();
  const [ success, setSuccess ] = useState<boolean | null>(null);
  const [ { data, fetching } ] = useUserDetailsQuery();

  useEffect(() => {
    const newSuccess = (fetching) ? null : data?.userDetails == null;
    if (newSuccess == false) {
      const { route } = router.query;
      router.push((typeof route === 'string') ? route : '/');
    }
    setSuccess(newSuccess);
  }, [ data, fetching, router ]);

  return success;
};
