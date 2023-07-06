import styles from './page.module.scss';

import { Loading, Wrapper, WrapperPropsSize } from '@finance/react';
import { NavBar } from '../nav-bar';
import { FC, PropsWithChildren } from 'react';
import { useUserDetailsQuery } from '../../generated/graphql';

export interface PageProps extends PropsWithChildren {
  guards?: (boolean | null)[];
  size?: WrapperPropsSize;
}

export const Page: FC<PageProps> = ({
  children,
  guards,
  size
}) => {
  const areGuardsPassed = guards?.every((isPassed) => isPassed) ?? true;
  const [ { fetching: fetchingUser } ] = useUserDetailsQuery();

  return (
    <Loading isLoading={!areGuardsPassed || fetchingUser}>
      <NavBar size={size} />
      <Wrapper size={size}>
        {children}
      </Wrapper>
    </Loading>
  );
};
