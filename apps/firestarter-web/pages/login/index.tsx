import { Button, Stack, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useUserLoginMutation } from '../../generated/graphql';
import { handleFormErrorMessages, InputField, Link } from '@finance/react';
import { Page } from '../../components';
import { useUnauthenticatedGuard } from '../../guards';

export interface LoginFormValues {
  username: string;
  password: string;
}

const loginGuards = [ useUnauthenticatedGuard ];

export const LoginPage: FC = () => {
  const toast = useToast();
  const [ , userLogin ] = useUserLoginMutation();
  const guardResults = loginGuards.map((guard) => guard());

  return (
    <>
      <title>Login</title>
      <Page guards={guardResults} size='medium'>
        <Formik
          initialValues={{ password: '', username: '' }}
          onSubmit={async (values, { setErrors }): Promise<void> => {
            const response = await userLogin({ input: values });
            if (handleFormErrorMessages(response, setErrors, toast)) {
              toast({
                title: 'login success',
                description: 'you have successfully logged in',
                status: 'success',
                duration: 3000,
                isClosable: true
              });
            }
          }}
        >{({ isSubmitting }): JSX.Element => (
            <Form className={'spacedRows'}>
              <InputField autoFocus label='Username' name='username' placeholder='username' />
              <InputField label='Password' name='password' placeholder='password' type='password' ispassword />
              <Stack direction='row' justifyContent='center' spacing='1rem'>
                <Link label='Need an account?' route='/register' />
                <Link label='Forgot password?' route='/forgot-password' />
              </Stack>
              <Stack direction='row' justifyContent='end' spacing='1rem'>
                <Button isLoading={isSubmitting} type='submit'>
                Log in
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Page>
    </>
  );
};

export default LoginPage;
