import { FC, PropsWithChildren } from 'react';

import { Loading, Wrapper, WrapperPropsSize } from '@finance/react';
import { useUserDetailsQuery } from '../../generated/graphql';
import _styles from './page.module.scss';
import { NavBar } from '../nav-bar';

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
      <NavBar size={'full'} />
      <Wrapper size={size}>
        {children}
      </Wrapper>
    </Loading>
  );
};
