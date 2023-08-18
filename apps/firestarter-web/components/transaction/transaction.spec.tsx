import { render } from '@testing-library/react';
import { Transaction } from './transaction';
import { MockUrqlProvider } from '../../functions/testing';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

describe('Transaction', () => {
  it('should render successfully', () => {
    useRouter();
    const { baseElement } = render(
      <MockUrqlProvider>
        <Transaction
          transactionID={'1'}
          transactionType={1}
          transactionAmount={1}
        />
      </MockUrqlProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
