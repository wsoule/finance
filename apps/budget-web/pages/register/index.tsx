import { FC } from 'react';

import _styles from './index.module.scss';
import { Page } from '../../components';
import { Button, Stack, useToast } from '@chakra-ui/react';
import { useUnauthenticatedGuard } from '../../guards';
import { useUserCreateMutation } from '../../generated/graphql';
import { useRouter } from 'next/navigation';
import { Form, Formik } from 'formik';
import { InputField, Link, handleFormErrorMessages } from '@finance/react';


/* eslint-disable-next-line */
export interface RegisterProps {
}

const registerGuards = [ useUnauthenticatedGuard ];

export const RegisterPage: FC<RegisterProps> = () => {
  const [ , userCreate ] = useUserCreateMutation();
  const router = useRouter();
  const toast = useToast();
  const guardResults = registerGuards.map((guard) => guard());

  return (
    <Page guards={guardResults} size='medium'>
      <Formik
        initialValues={{ password: '', username: '', email: '' }}
        onSubmit={async (values, { setErrors }): Promise<void> => {
          const response = await userCreate({ input: values });
          console.log('response', response);
          if (handleFormErrorMessages(response, setErrors, toast)) {
            router.push('/');
            toast({
              title: 'User Creation Success',
              description: 'Welcome to Budgeting!',
              status: 'success',
              isClosable: true
            });
          }
        }}
      >{({ isSubmitting }): JSX.Element => (
          <Form className='spaced-rows'>
            <InputField autoFocus label='Username' name='username' />
            <InputField label='Email' name='email' type='email' />
            <InputField label='Password' name='password' type='password' ispassword={true} />
            <Stack direction='row' justifyContent='center' spacing='1rem'>
              <Link label='Already have account?' route='/login' />
            </Stack>
            <Stack direction='row' justifyContent='end' spacing='1rem'>
              <Button isLoading={isSubmitting} type='submit'>
                Create
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default RegisterPage;
