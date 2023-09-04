import { Button } from '@chakra-ui/button';
import {
  MoonIcon,
  SettingsIcon,
  SunIcon
} from '@chakra-ui/icons';
import {
  Center,
  Divider
} from '@chakra-ui/layout';
import {
  Menu,
  MenuButton
} from '@chakra-ui/menu';
import { useToast } from '@chakra-ui/toast';
import {
  Heading,
  MenuItem,
  MenuList,
  Stack,
  useColorMode
} from '@chakra-ui/react';
import {
  FC,
  useEffect,
  useState
} from 'react';
import {
  Link,
  WrapperPropsSize,
  wrapperSizeToPixels
} from '@finance/react';
import {
  useUserDetailsQuery,
  useUserLogoutMutation
} from '../../generated/graphql';
import { useRouter } from 'next/router';
import styles from './nav-bar.module.scss';

export interface NavBarProps {
  size?: WrapperPropsSize;
}

export const NavBar: FC<NavBarProps> = ({ size }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const [ , logout ] = useUserLogoutMutation();
  const [ { data, fetching: useDetailsFetching } ] = useUserDetailsQuery();
  const { username } = data?.userDetails ?? {};
  const router = useRouter();
  const [ profileMenuList, setProfileMenuList ] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (useDetailsFetching) {
      setProfileMenuList(
        <MenuList>
          Loading...
        </MenuList>
      );
    } else if (!username) {
      setProfileMenuList(
        <MenuList>
          <MenuItem as='a' href={`login${router.asPath}`}>
            Log in
          </MenuItem>
          <MenuItem as='a' href='/register'>
            Register
          </MenuItem>
        </MenuList>
      );
    } else {
      setProfileMenuList(
        <MenuList>
          <Center>Hello {username},</Center>
          <MenuItem
            onClick={async (): Promise<void> => {
              await router.push(`/?route=${router.asPath}`);
              await logout({});
              toast({
                status: 'success',
                title: 'Logged out'
              });
            }}
          >
            Log out
          </MenuItem>
        </MenuList>
      );
    }
  }, [
    logout,
    router,
    toast,
    useDetailsFetching,
    username
  ]);

  return (
    <Stack alignItems='center' paddingX='2em' paddingY='0.5em'>
      <Stack
        direction='row'
        justifyContent='space-between'
        marginY='auto'
        maxWidth={`${wrapperSizeToPixels(size)}`}
        width='100%'
      >
        <Stack direction='row'>
          <Link label='FireStarter Home' route='/' style={{ textDecoration: 'none' }}>
            <Heading color={'red.500'}>FireStarter</Heading>
          </Link>
        </Stack>
        <Stack direction='row' alignItems={'baseline'} spacing='0.5em'>
          <Link className={styles.noUnderline} route={'/dashboard'}>
            <Heading size={'md'} variant={'nav-bar'}>
              Dashboard
            </Heading>
          </Link>
          <Link className={styles.noUnderline} route={'/transactions'}>
            <Heading size={'md'} variant={'nav-bar'}>
              Transactions
            </Heading>
          </Link>
          <Button onClick={toggleColorMode} rounded='25%' variant={'ghost'}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Menu>
            <MenuButton as={Button} leftIcon={<SettingsIcon />} variant='ghost'>
              Profile
            </MenuButton>
            {profileMenuList}
          </Menu>
        </Stack>
      </Stack>
      <Divider />
    </Stack>
  );
};
