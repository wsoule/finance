import { Form, Formik } from 'formik';
import { render } from '@testing-library/react';
import { MoneyInputField } from './money-input-field';

describe('MoneyInput', () => {
  it('should render successfully', () => {
    const handleChange = (value: number | null): void => {
      console.log(value);
    };
    const { baseElement } = render(
      <Formik initialValues={{ default: 0 }} onSubmit={async (values): Promise<void> => {
        console.log(values);
      }}>
        <Form>
          <MoneyInputField name='defaultInput' getNumberValue={handleChange} label='defaultInput' />
        </Form>
      </Formik>
    );
    expect(baseElement).toBeDefined();
  });
});
