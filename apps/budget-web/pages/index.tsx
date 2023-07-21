import { FC, useEffect, useState } from 'react';
import { Button, Heading, Stat, StatHelpText, StatLabel, StatNumber, Text, useToast} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Page } from '../components';
import { useAccountDetailsQuery, useUpdateBalanceMutation, useUserDetailsQuery } from '../generated/graphql';
import { InputField, handleFormErrorMessages } from '@finance/react';
import { Form, Formik } from 'formik';

export const Index: FC = () => {
  const router = useRouter();
  const [ { data: userData, fetching: userDetailsFetching }] = useUserDetailsQuery();
  const [ { data: balanceAmount, fetching: balanceFetching }] = useAccountDetailsQuery();
  const [ , balanceUpdate ] = useUpdateBalanceMutation();
  const { username, id: userId } = userData?.userDetails ?? {};
  const { balance, updatedAt, id: accountId } = balanceAmount?.accountDetails ?? { balance: 0 };
  const [ stateBalance, setStateBalance ] = useState<number>(balance);
  const [ editBalance, setEditBalance ] = useState(false);
  const toast = useToast();

  const updatedAtString = (updatedAtNumber: number | undefined): string => {
    return ((updatedAtNumber) ? new Date(updatedAtNumber).toLocaleDateString('en-US', {weekday:'long', year:'numeric', month:'short', day:'2-digit', hour: '2-digit', minute:'2-digit'}) : 'no date available');
  };
  const [ updatedAtToDate, setUpdatedAtToDate ] = useState(updatedAtString(updatedAt));

  useEffect(() => {
    setUpdatedAtToDate(updatedAtString(updatedAt));
  }, [updatedAt]);

  useEffect(() => {
    setStateBalance(balance);
  }, [balance]);

  const openRegisterPage = (): void => {
    router.push('/register');
  };

  const openLoginPage = (): void => {
    router.push('/login');
  };

  const handleEditClick = (): void => {
    setEditBalance(!editBalance);
  };

  let mainPageFormat: JSX.Element | null;
  if (userDetailsFetching || balanceFetching) {
    mainPageFormat = <Heading>Loading...</Heading>;
  } else if(!username) {
    mainPageFormat = (
      <>
        <Heading mb={4}>Welcome to <Text as={'span'} color={'red.500'}>FireStarter</Text></Heading>
        <Text size={'lg'}>
          Manage your FI/RE recourses easily, today with FireStarter
        </Text>
        <Button size={'lg'} mt={'24px'}  mr={'12px'} onClick={openRegisterPage}>
        Create Account
        </Button>
        <Button size={'lg'} mt={'24px'} mr={'12px'} onClick={openLoginPage}>
        Login
        </Button>
      </>
    );
  } else {
    mainPageFormat = (
      <>
        <Heading key={userId} mb={4}>Welcome {username}</Heading>
        <Stat borderWidth={'1px'} borderRadius={'lg'} padding={'2'} key={accountId}>
          <StatLabel>Balance</StatLabel>
          <StatNumber>${stateBalance}</StatNumber>
          <StatLabel>Last Updated</StatLabel>
          <StatHelpText>{updatedAtToDate}</StatHelpText>
          { !editBalance && (
            <>
              <Button onClick={handleEditClick}>Edit</Button>

            </>
          )
          }
          { editBalance && (
            <Formik
              initialValues={{ balance: stateBalance }}
              onSubmit={async (values, { setErrors }): Promise<void> => {
                values.balance = parseInt(values.balance as unknown as string);
                setEditBalance(!editBalance);
                setUpdatedAtToDate(updatedAtString(Date.parse(new Date().toString())));
                const balanceUpdateResponse = await balanceUpdate({ input: values });
                if(handleFormErrorMessages(balanceUpdateResponse, setErrors, toast)) {
                  toast({
                    title: 'Balance Update Success',
                    description: `balance was updated to ${values.balance}`,
                    status: 'success',
                    isClosable: true
                  });
                }
              }}
              onReset={async (values, { setErrors: _ }): Promise<void> => {
                setStateBalance(values.balance);
                setEditBalance(!editBalance);
              }}
            >{({ isSubmitting, handleChange, values }): JSX.Element => (
                <Form>
                  <InputField name='balance' label='Update Balance:' type='number' value={values.balance} onChange={(e):void => {
                    setStateBalance(e.target.value as unknown as number );
                    handleChange(e);
                  }} />
                  <Button isLoading={isSubmitting} type='submit' colorScheme='green'>&#10003;</Button>
                  <Button type='reset' colorScheme='red'>&#10005;</Button>
                </Form>
              )}
            </Formik>
          )}
        </Stat>
      </>
    );
  }

  return (
    <>
      <title>Home</title>
      <Page size='large'>
        {mainPageFormat}
      </Page>
    </>
  );
};

export default Index;