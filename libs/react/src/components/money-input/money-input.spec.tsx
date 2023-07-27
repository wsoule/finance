import { Form, Formik } from 'formik';
import { render } from '@testing-library/react';

import { MoneyInput }from './money-input';

describe('MoneyInput', () => {
  it('should render successfully', () => {
    const handleChange = (value: number):void => {
      console.log(value);
    };
    const { baseElement } = render(
      <Formik initialValues={{ default: 0 }} onSubmit={async (values): Promise<void> => {
        console.log(values);
      }} >
        <Form>
          <MoneyInput name='defaultInput' onValueChange={handleChange} label='defaultInput' />
        </Form>
      </Formik>
    );
    expect(baseElement).toBeDefined();
  });
});
