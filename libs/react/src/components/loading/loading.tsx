import { FC, PropsWithChildren } from 'react';
import cssClasses from './loading.module.scss';
import { Spinner } from '@chakra-ui/react';

export interface LoadingProps extends PropsWithChildren {
  isLoading: boolean;
  loadingText?: string;
  center?: boolean;
}

export const Loading: FC<LoadingProps> = ({
  children,
  isLoading,
  loadingText = 'Loading...',
  center = false
}) => {
  return (
    <div className={cssClasses.container}>
      {(isLoading) ? (
        <div className={`${cssClasses.middleContainer} ${(center) ? cssClasses.center : ''}`}>
          <Spinner className={cssClasses.spinner} size={'xl'} />
          <div className={cssClasses.text}>{loadingText}</div>
        </div>
      ) : (
        children
      )}
    </div>);
};
