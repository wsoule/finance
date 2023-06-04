import { FC, MouseEventHandler, useState } from 'react';
import { useUserDetailsQuery, useUserLoginMutation } from '../generated/graphql';
import { Button, ChakraProvider} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const Page: FC = () => {
  const router = useRouter();
  
  const openLogin = (): void => {
    router.push('/login');
  };
  return (
    <>
      <Button onClick={openLogin}>
          login
      </Button>
    </>
  );
};

export default Page;