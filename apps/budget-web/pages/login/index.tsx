import { useToast, Button, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC, useState } from 'react';

import { useUserLoginMutation } from '../../generated/graphql';
import { InputField, Link, handleFormErrorMessages } from '@finance/react';

export interface LoginFormValues {
  username: string;
  password: string;
}

export const LoginPage: FC = () => {
  const toast = useToast();
  const [, userLogin] = useUserLoginMutation();
  const [disable, setDisable] = useState(true);

  const validateForm = (values: LoginFormValues): Partial<LoginFormValues> => {
    const errors: Partial<LoginFormValues> = {};

    if (!values.username) {
      errors.username = 'Username is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    if (!errors.username && !errors.password){
      setDisable(false);
    } else {
      setDisable(true);
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{ password: '', username: ''}}
      validate={validateForm}
      onSubmit={async (values, { setErrors }): Promise<void> => {
        const response = await userLogin({ input: values });
        handleFormErrorMessages(response, setErrors, toast);
        console.log(response);
      }}
    >{({ isSubmitting }): JSX.Element => (
        <Form className='spaced-rows'>
          <InputField label='Username' name='username' placeholder='username' />
          <InputField label='Password' name='password' placeholder='password' type='password'/>
          <Stack direction='row' justifyContent='center' spacing='1rem'>
            <Link label='Go Home' route='/' />
          </Stack>
          <Stack direction='row' justifyContent='end' spacing='1rem'>
            <Button isLoading={isSubmitting} isDisabled={disable}
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
