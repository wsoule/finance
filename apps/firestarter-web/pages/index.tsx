import {
  Button,
  Heading,
  Text
} from '@chakra-ui/react';
import { Loading } from '@finance/react';
import { useRouter } from 'next/router';
import {
  FC,
  useEffect,
  useState
} from 'react';
import { Page } from '../components';
import { useUserDetailsQuery } from '../generated/graphql';
import './_app';

export const Index: FC = () => {
  const [ { data: userData, fetching: userDetailsFetching } ] = useUserDetailsQuery();
  const { username } = userData?.userDetails ?? {};
  const [ mainPageFormat, setMainPageFormat ] = useState<JSX.Element | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (userDetailsFetching) {
      setMainPageFormat(<Loading isLoading={true} />);
    } else if (!username) {
      const openRegisterPage = async (): Promise<void> => {
        await router.push(`/register${router.asPath}`);
      };

      const openLoginPage = async (): Promise<void> => {
        await router.push(`/login${router.asPath}`);
      };
      setMainPageFormat(
        <>
          <Heading mb={4}>Welcome to <Text as={'span'} color={'red.500'}>FireStarter</Text></Heading>
          <Text size={'lg'}>
            Manage your FI/RE recourses easily, today with FireStarter
          </Text>
          <Button size={'lg'} mt={'24px'} mr={'12px'} onClick={openRegisterPage}>
            Create Account
          </Button>
          <Button size={'lg'} mt={'24px'} mr={'12px'} onClick={openLoginPage}>
            Login
          </Button>
        </>
      );
    } else {
      setMainPageFormat(
        <>
          <Heading>Hello {username}!</Heading>
        </>
      );
    }
  }, [ router, userDetailsFetching, username ]);

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
