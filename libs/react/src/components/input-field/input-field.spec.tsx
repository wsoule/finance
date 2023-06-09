import { render } from '@testing-library/react';

import { InputField } from './input-field';
import { Form, Formik } from 'formik';

describe('InputField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Formik initialValues={{ default: ''}} onSubmit={async (values): Promise<void> => {
        console.log(values.default);
      }} >
        <Form>
          <InputField label='defaultInput' name='defaultInput' placeholder='defaultInput'/>
        </Form>
      </Formik>
    );
    expect(baseElement).toBeDefined();
  });
});
