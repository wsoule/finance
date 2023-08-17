import { render } from '@testing-library/react';

import { Transaction } from './transaction';

describe('Transactions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Transaction
        transactionID={'1'}
        transactionType={1}
        transactionAmount={1}
      />);
    expect(baseElement).toBeTruthy();
  });
});
