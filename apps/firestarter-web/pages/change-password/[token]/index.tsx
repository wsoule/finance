import { Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useChangePasswordGuard } from '../../../guards';
import { useUserChangePasswordMutation } from '../../../generated/graphql';
import { Page } from '../../../components';
import appStyles from '../../app.module.scss';
import { Form, Formik } from 'formik';
import { handleFormErrorMessages, InputField, toastFormControlError } from '@finance/react';

const changePasswordGuards = [ useChangePasswordGuard ];

export const ChangePasswordPage: NextPage = () => {
  const [ , userChangePassword ] = useUserChangePasswordMutation();
  const router = useRouter();
  const toast = useToast();
  const guardResults = changePasswordGuards.map((guard) => guard());

  return (
    <Page guards={guardResults} size={'medium'}>
      <Formik
        initialValues={{ password: '', token: router.query.token as string }}
        onSubmit={async (values, { setErrors }): Promise<void> => {
          const response = await userChangePassword({ input: values });
          if (!toastFormControlError(response, toast, 'token', 'Token')) {
            await router.push('/forgot-password');
          } else if (handleFormErrorMessages(response, setErrors, toast)) {
            toast({
              title: 'Password Reset',
              status: 'success'
            });
            await router.push('/login');
          }
        }}
      >{({ isSubmitting }): JSX.Element => (
          <Form className={appStyles.spacedRows}>
            <InputField label={'Password'} name={'password'} placeholder={'password'} ispassword={true} />
            <Button isLoading={isSubmitting} type={'submit'}>Change Password</Button>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default ChangePasswordPage;
