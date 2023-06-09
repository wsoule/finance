import { useToast, Button, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';

import { useUserLoginMutation } from '../../generated/graphql';
import { InputField, Link, handleFormErrorMessages } from '@finance/react';
import { Page } from '../../components/page';
import { useUnauthenticatedGuard } from '../../guards';
import { useRouter } from 'next/navigation';

export interface LoginFormValues {
  username: string;
  password: string;
}

const loginGuards = [ useUnauthenticatedGuard ];

export const LoginPage: FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [, userLogin] = useUserLoginMutation();
  const guardResults = loginGuards.map((guard) => guard());

  return (
    <>
      <title>login</title>
      <Page guards={guardResults} size='medium'>
        <Formik
          initialValues={{ password: '', username: ''}}
          onSubmit={async (values, { setErrors }): Promise<void> => {
            const response = await userLogin({ input: values });
            console.log('response:', response, 'setErrors', setErrors);
            if (handleFormErrorMessages(response, setErrors, toast)) {
              router.push('/');
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
            <Form className='spaced-rows'>
              <InputField autoFocus label='Username' name='username' placeholder='username' />
              <InputField label='Password' name='password' placeholder='password' type='password' ispassword={true} />
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
