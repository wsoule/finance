import { useToast } from '@chakra-ui/react';
import { Formik } from 'formik';
import { useUserDetailsQuery, useUserLoginMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
import { FC, ReactNode, useState } from 'react';

export const LoginPage: FC = () => {
  const router = useRouter();
  const toast = useToast();
  const [username, setUsername] = useState('');
  // const [{ data: userDetails, fetching }] = useUserDetailsQuery({
  //   variables: {
  //     input: { username : username }
  //   }
  // });
  const [, userLogin] = useUserLoginMutation();

  return (
    <Formik
      initialValues={{ password: '', username: ''}}
      onSubmit={async (values): Promise<void> => {
        console.log(await userLogin({ input: values }));
      }}
    >{({ isSubmitting })}
    </Formik>

  );
};

export default LoginPage;
