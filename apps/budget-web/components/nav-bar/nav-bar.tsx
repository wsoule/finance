import { Button } from '@chakra-ui/button';
import { SettingsIcon } from '@chakra-ui/icons';
import { Center, Divider, Heading, Stack } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { useToast } from '@chakra-ui/toast';
import { FC } from 'react';

import { Link, wrapperSizeToPixels, WrapperPropsSize } from '@finance/react';
import { useUserDetailsQuery, useUserLogoutMutation } from '../../generated/graphql';
import styles from './nav-bar.module.scss';

export interface NavBarProps {
  size?: WrapperPropsSize;
}

export const NavBar: FC<NavBarProps> = ({ size }) => {
  const [ { fetching: logoutFetching }, logout ] = useUserLogoutMutation();
  const [ { data, fetching: useDetailsFetching } ] = useUserDetailsQuery();
  const toast = useToast();
  const { username } = data?.userDetails ?? {};

  let profileMenuList: JSX.Element | null = null;
  if (useDetailsFetching) {
    profileMenuList = <MenuList>
    Loading...
    </MenuList>;
  } else if (!username) {
    profileMenuList = <MenuList>
      <MenuItem>
        <Link label='Log In' padding='0.5em' route='/login' variant='ghost'>
         Log In
        </Link>
      </MenuItem>
      <MenuItem>
        <Link label='Register' padding='0.5em' route='/register' variant='ghost'>
         Register
        </Link>
      </MenuItem>
    </MenuList>;
  } else {
    profileMenuList = <MenuList>
      <Center>Hello {username},</Center>
      <MenuItem
        onClick={async (): Promise<void> => {
          await logout({});
          toast({ status: 'success', title: 'Logged out' });
        }}
      >
      Log out
      </MenuItem>
    </MenuList>;
  }

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
          <Link label='Budget Home' route='/' style={{ textDecoration: 'none'}}>
            <Heading>Budget</Heading>
          </Link>
        </Stack>
        <Stack direction='row' spacing='0.5em'>
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
