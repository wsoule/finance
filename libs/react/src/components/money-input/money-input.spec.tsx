import { render } from '@testing-library/react';

import { MoneyInput }from './money-input';

describe('MoneyInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MoneyInput />);
    expect(baseElement).toBeTruthy();
  });
});
