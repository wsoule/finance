import { FC, PropsWithChildren } from 'react';
import styles from './loading.module.scss';

export interface LoadingProps extends PropsWithChildren{
  isLoading: boolean;
}

export const Loading: FC<LoadingProps> = ({ children, isLoading }) => {
  return <div>{(isLoading) ? 'Loading...' : children}</div>;
};
