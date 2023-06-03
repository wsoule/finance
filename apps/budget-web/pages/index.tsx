import { FC, MouseEventHandler, useState } from 'react';
import { useUserDetailsQuery, useUserLoginMutation } from '../generated/graphql';
import { Button, ChakraProvider} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const Page: FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [{ data: userDetails, fetching }] = useUserDetailsQuery({
    variables: {
      input: { username : search }
    }
  });
  const [, userLogin] = useUserLoginMutation();

  const onLogin = async (): Promise<void> => {
    console.log(await userLogin({
      input: {
        password: '1234',
        username: 'user1'
      }
    }));
  };
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