import { useToast, Input, FormLabel, HStack, Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
// import { useRouter } from 'next/router';
import { FC } from 'react';

import { useUserLoginMutation } from '../../generated/graphql';
import { handleFormErrorMessages } from '../../../../libs/';

export const LoginPage: FC = () => {
  // const router = useRouter();
  const toast = useToast();
  const [, userLogin] = useUserLoginMutation();

  return (
    <Formik
      initialValues={{ password: '', username: ''}}
      onSubmit={async (values, { setErrors }): Promise<void> => {
        const response = await userLogin({ input: values });
        handleFormErrorMessages(response, setErrors, toast);
        console.log(response);
      }}
    >{({ isSubmitting }): JSX.Element => (
        <Form className='spaced-rows'>
          <Field name='username'>
            {({ field, form }): JSX.Element => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>Username</FormLabel>
                <Input {...field} placeholder='username' />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='password'>
            {({ field, form }): JSX.Element => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>Password</FormLabel>
                <Input {...form} placeholder='password' />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button isLoading={isSubmitting}
            type='submit'
          >
          submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;

/*
<FormLabel>Username</FormLabel>
          <Input name='username' placeholder='username' />
          <Input name='password' placeholder='password' />
          <HStack spacing={'1rem'} justifyContent={'center'} direction={'row'}>
            <Link href={'/'}>ME TOO</Link>
          </HStack>
          <HStack direction={'row'} justifyContent={'end'} spacing={'1rem'}>
            <Button isLoading={isSubmitting} type='submit'>Log In</Button>
          </HStack>
          */