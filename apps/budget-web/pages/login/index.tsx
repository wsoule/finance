import { useToast, Button, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';

import { useUserLoginMutation } from '../../generated/graphql';
import { InputField, Link, handleFormErrorMessages } from '@finance/react';

export interface LoginFormValues {
  username: string;
  password: string;
}

export const LoginPage: FC = () => {
  const toast = useToast();
  const [, userLogin] = useUserLoginMutation();

  return (
    <Formik
      initialValues={{ password: '', username: ''}}
      onSubmit={async (values, { setErrors }): Promise<void> => {
        const response = await userLogin({ input: values });
        console.log('response:', response, 'setErrors', setErrors);
        handleFormErrorMessages(response, setErrors, toast);
      }}
    >{({ isSubmitting }): JSX.Element => (
        <Form className='spaced-rows'>
          <InputField label='Username' name='username' placeholder='username' />
          <InputField label='Password' name='password' placeholder='password' type='password'/>
          <Stack direction='row' justifyContent='center' spacing='1rem'>
            <Link label='Go Home' route='/' />
          </Stack>
          <Stack direction='row' justifyContent='end' spacing='1rem'>
            <Button isLoading={isSubmitting}
              type='submit'>
          submit
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
