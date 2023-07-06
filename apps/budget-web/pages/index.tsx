import { FC } from 'react';
import { Button} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Page } from '../components/page';

export const Index: FC = () => {
  const router = useRouter();
  
  const openLogin = (): void => {
    router.push('/login');
  };
  return (
    <Page size='medium' >
      <Button onClick={openLogin}>
          login
      </Button>
    </Page>
  );
};

export default Index;