import { FC, PropsWithChildren } from 'react';
import { Provider } from 'urql';
import { createMockUrqlClient } from './create-mock-urql-client';

export const mockUrqlClient = createMockUrqlClient();

export const MockUrqlProvider: FC<PropsWithChildren> = ({
  children
}) => {
  return (
    <Provider
      value={mockUrqlClient}
    >
      {children}
    </Provider>
  );
};
