import { FC, PropsWithChildren } from 'react';
import cssClasses from './loading.module.scss';
import { Spinner } from '@chakra-ui/react';

export interface LoadingProps extends PropsWithChildren {
  isLoading: boolean;
  loadingText?: string;
}

export const Loading: FC<LoadingProps> = ({
  children,
  isLoading,
  loadingText = 'Loading...'
}) => {
  return (
    <div className={cssClasses.container}>
      {(isLoading) ? (
        <div className={cssClasses.middleContainer}>
          <Spinner className={cssClasses.spinner} size={'xl'}/>
          <div className={cssClasses.text}>{loadingText}</div>
        </div>
      ) : (
        children
      )}
    </div>);
};
