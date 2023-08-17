import { render } from '@testing-library/react';

import Transactions from './index';

describe('Transactions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Transactions />);
    expect(baseElement).toBeTruthy();
  });
});
