import { Button, Stack, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Page } from '../../components';
import { handleFormErrorMessages, InputField } from '@finance/react';
import { useUserForgotPasswordMutation } from '../../generated/graphql';
import { useUnauthenticatedGuard } from '../../guards';
import appStyles from '../app.module.scss';

const forgotPasswordGuards = [ useUnauthenticatedGuard ];

export const ForgotPasswordPage: FC = () => {
  const [ , userForgotPassword ] = useUserForgotPasswordMutation();
  const router = useRouter();
  const toast = useToast();
  const guardResults = forgotPasswordGuards.map((guard) => guard());

  return (
    <Page guards={guardResults} size='medium'>
      <Formik
        initialValues={{ username: '' }}
        onSubmit={async (values, { setErrors }): Promise<void> => {
          const response = await userForgotPassword({ input: values });
          if (handleFormErrorMessages(response, setErrors, toast)) {
            toast({
              description: 'Check inbox to reset password.',
              isClosable: true,
              status: 'success',
              title: 'Email sent.'
            });
            await router.push('/login');
          }
        }}
      >{({ isSubmitting }): JSX.Element => (
          <Form className={appStyles.spacedRows}>
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

export default ForgotPasswordPage;
