import { Button, Stack, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Page } from '../../components';
import { InputField, handleFormErrorMessages } from '@finance/react';
import { useUserForgotPasswordMutation } from '../../generated/graphql';
import { useUnauthenticatedGuard } from '../../guards';
import _styles from './index.module.scss';


const forgotPasswordGuards = [ useUnauthenticatedGuard ];

export const ForgotPassword: FC = () => {
  const [ , userForgotPassword ] = useUserForgotPasswordMutation();
  const router = useRouter();
  const toast = useToast();
  const guardResults = forgotPasswordGuards.map((guard) => guard());


  return (
    <Page guards={guardResults} size='medium'>
      <Formik
        initialValues={{ username: '' }}
        onSubmit={async ( values, { setErrors }): Promise<void> => {
          const response = await userForgotPassword({ input: values });
          if (handleFormErrorMessages(response, setErrors, toast)) {
            toast({
              description: 'Check inbox to reset password.',
              isClosable: true,
              status: 'success',
              title: 'Email sent.'
            });
            router.push('/login');
          }
        }}
      >{({ isSubmitting }): JSX.Element => (
          <Form className={'spaced-rows'}>
            <InputField label='Username' name='username' placeholder='username' />
            <Stack direction={'row'} justifyContent={'end'} spacing={'1rem'}>
              <Button isLoading={isSubmitting} type={'submit'}>Request Password Reseet</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Page>
  );

};


export default ForgotPassword;
