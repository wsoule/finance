import { FC } from 'react';
import { Button, Heading, Stat, StatHelpText, StatLabel, StatNumber, Text} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import { Page } from '../components';
import { useUserDetailsQuery } from '../generated/graphql';

export const Index: FC = () => {
  const router = useRouter();
  const [ { data, fetching: userDetailsFetching }] = useUserDetailsQuery();
  const { username } = data?.userDetails ?? {};
  
  const openRegisterPage = (): void => {
    router.push('/register');
  };
  const openLoginPage = (): void => {
    router.push('/login');
  };

  let mainPageFormat: JSX.Element | null;
  if (userDetailsFetching) {
    mainPageFormat = <Heading>Loading...</Heading>;
  } else if(!username) {
    mainPageFormat = (
      <>
        <Heading mb={4}>Welcome to <Text as={'span'} color={'red.500'}>FireStarter</Text></Heading>
        <Text size={'lg'}>
          Manage your FI/RE recourses easily, today with FireStarter
        </Text>
        <Button size={'lg'} mt={'24px'}  mr={'12px'} onClick={openRegisterPage}>
        Create Account
        </Button>
        <Button size={'lg'} mt={'24px'} mr={'12px'} onClick={openLoginPage}>
        Login
        </Button>
      </>
    );
  } else {
    mainPageFormat = (
      <>
        <Heading mb={4}>Welcome {username}</Heading>
        <Stat borderWidth={'1px'} borderRadius={'lg'} padding={'2'}>
          <StatLabel>Balance</StatLabel>
          <StatNumber>$0.00</StatNumber>
          <StatHelpText>Last Updated</StatHelpText>
        </Stat>
      </>
    );
  }

  return (
    <>
      <title>Home</title>
      <Page size='large'>
        {mainPageFormat}
      </Page>
    </>
  );
};

export default Index;