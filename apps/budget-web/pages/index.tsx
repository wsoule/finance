import { Button, Heading, Stat, StatHelpText, StatLabel, StatNumber, Text, useToast} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { Page } from '../components';
import { convertToMoney } from '@finance/core';
import { handleFormErrorMessages, MoneyInput } from '@finance/react';
import { Form, Formik } from 'formik';
import { useAccountDetailsQuery, useAccountUpdateBalanceMutation, useUserDetailsQuery } from '../generated/graphql';

export const Index: FC = () => {
  const [ { data: balanceAmount, fetching: balanceFetching }] = useAccountDetailsQuery();
  const [ , balanceUpdate ] = useAccountUpdateBalanceMutation();
  const [ { data: userData, fetching: userDetailsFetching }] = useUserDetailsQuery();
  const { balance, updatedAt, id: accountId } = balanceAmount?.accountDetails ?? { balance: 0 };
  const [ stateBalance, setStateBalance ] = useState<number | null>(balance ?? null);
  const { username, id: userId } = userData?.userDetails ?? {};
  const [ editBalance, setEditBalance ] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    setStateBalance(balance);
  }, [balance]);

  const updatedAtString = (updatedAtNumber: number | undefined): string => {
    return ((updatedAtNumber) ? new Date(updatedAtNumber).toLocaleDateString('en-US', {weekday:'long', year:'numeric', month:'short', day:'2-digit', hour: '2-digit', minute:'2-digit'}) : 'no date available');
  };

  const openRegisterPage = (): void => {
    router.push('/register');
  };

  const openLoginPage = (): void => {
    router.push('/login');
  };

  const handleEditClick = (): void => {
    setEditBalance(!editBalance);
  };

  const handleAmountChange = (value: number | null): void => {
    console.log('value', value);
    setStateBalance(value);
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
          <StatNumber>{convertToMoney(balance)}</StatNumber>
          <StatLabel>Last Updated</StatLabel>
          <StatHelpText>{updatedAtString(updatedAt)}</StatHelpText>
          { !editBalance && (
            <Button onClick={handleEditClick}>Edit</Button>
          ) }
          { editBalance && (
            <Formik
              initialValues={{ balance }}
              onSubmit={async (values, { setErrors }): Promise<void> => {
                values.balance = (stateBalance ?? balance);
                if (values.balance === balance) {
                  setEditBalance(!editBalance);
                  return;
                }
                const balanceUpdateResponse = await balanceUpdate({ input: values });
                console.log(balanceUpdateResponse);
                if (handleFormErrorMessages(balanceUpdateResponse, setErrors, toast)) {
                  toast({
                    title: 'Balance Update Success',
                    description: `balance was updated to ${convertToMoney(balanceUpdateResponse.data?.accountUpdateBalance.balance ?? values.balance ?? 0)}`,
                    status: 'success',
                    isClosable: true
                  });
                  setEditBalance(!editBalance);
                }
              }}
              onReset={async (_values, { setErrors: _setErrors }): Promise<void> => {
                setEditBalance(!editBalance);
              }}
            >{({ isSubmitting }): JSX.Element => (
                <Form>
                  <MoneyInput name='balance' label='Update balance' value={stateBalance ?? balance} placeholder={balance.toFixed(2).toLocaleString()} onValueChange={handleAmountChange}/>
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
