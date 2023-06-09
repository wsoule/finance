import { FC } from 'react';
import { Button} from '@chakra-ui/react';
import { useRouter } from 'next/router';

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