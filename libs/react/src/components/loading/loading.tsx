import { FC, PropsWithChildren } from 'react';
import cssClasses from './loading.module.scss';
import { Spinner } from '@chakra-ui/react';

export interface LoadingProps extends PropsWithChildren{
  isLoading: boolean;
}

export const Loading: FC<LoadingProps> = ({ children, isLoading }) => {
  return (
    <div className={cssClasses.container}>
      {(isLoading) ? (
        <div className={cssClasses.middleContainer} >
          <Spinner className={cssClasses.spinner} size={'xl'}/>
          <div className={cssClasses.text}>Loading...</div>
        </div>
      ) : (
        children
      )}
    </div>);
};
