import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const LoginPage: FC = () => {
  const router = useRouter();

  const goHome = (): void => {
    router.push('/');
  };
  return (
    <Button onClick={goHome}>
    Home
    </Button>
  );
};

export default LoginPage;
