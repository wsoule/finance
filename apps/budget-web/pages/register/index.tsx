import { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import _styles from './index.module.scss';
import { Page } from '../../components';
import { useUnauthenticatedGuard } from '../../guards';
import { useUserCreateMutation } from '../../generated/graphql';
import { InputField, Link, handleFormErrorMessages } from '@finance/react';
import appStyles from '../app.module.scss';

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
    <>
      <title>Register</title>
      <Page guards={guardResults} size='medium'>
        <Box maxW='45rem'>
          <Heading mb={4}>
          Welcome to <Text as="span" color={'red.500'}>FireStarter</Text>
          </Heading>
          <Text mb={4} fontSize='xl'>
        Minimize you FI/RE timeline while maximizing your freedom
          </Text>
        </Box>
        <Formik
          initialValues={{ password: '', username: '', email: '' }}
          onSubmit={async (values, { setErrors }): Promise<void> => {
            const userCreateResponse = await userCreate({ input: values });

            if (handleFormErrorMessages(userCreateResponse, setErrors, toast)) {
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
            <Form className={appStyles.spacedRows}>
              <InputField autoFocus label='Username' name='username' />
              <InputField label='Email' name='email' type='email' />
              <InputField label='Password' name='password' type='password' ispassword />
              <Stack direction='row' justifyContent='center' spacing='1rem'>
                <Link label='Already have account?' route='/login' />
              </Stack>
              <Stack direction='row' justifyContent='end' spacing='1rem'>
                <Button colorScheme='red' isLoading={isSubmitting} type='submit'>
                Create
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Page>
    </>
  );
};

export default RegisterPage;
