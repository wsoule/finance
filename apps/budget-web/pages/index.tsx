import { FC, useEffect, useState } from 'react';
import { Button, Heading, Stat, StatHelpText, StatLabel, StatNumber, Text, useToast} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Page } from '../components';
import { useAccountDetailsQuery, useAccountUpdateBalanceMutation, useUserDetailsQuery } from '../generated/graphql';
import { InputField, handleFormErrorMessages, MoneyInput } from '@finance/react';
import { Form, Formik } from 'formik';
import { convertToMoney } from '@finance/core';

export const Index: FC = () => {
  const router = useRouter();
  const [ { data: userData, fetching: userDetailsFetching }] = useUserDetailsQuery();
  const [ { data: balanceAmount, fetching: balanceFetching }] = useAccountDetailsQuery();
  const [ , balanceUpdate ] = useAccountUpdateBalanceMutation();
  const { username, id: userId } = userData?.userDetails ?? {};
  const { balance, updatedAt, id: accountId } = balanceAmount?.accountDetails ?? { balance: 0 };
  const [ stateBalance, setStateBalance ] = useState<number>(balance ?? 0);
  const [ editBalance, setEditBalance ] = useState(false);
  const toast = useToast();

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

  const handleAmountChange = (value: number): void => {
    console.log(value);
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
                console.log(stateBalance);
                const valuesBalance = parseFloat(values.balance.toString());
                values.balance = (Number.isNaN(valuesBalance) ? 0 : valuesBalance);
                const balanceUpdateResponse = await balanceUpdate({ input: values });
                if (handleFormErrorMessages(balanceUpdateResponse, setErrors, toast)) {
                  toast({
                    title: 'Balance Update Success',
                    description: `balance was updated to ${convertToMoney(balanceUpdateResponse.data?.accountUpdateBalance.balance ?? values.balance)}`,
                    status: 'success',
                    isClosable: true
                  });
                }
                setEditBalance(!editBalance);
              }}
              onReset={async (_values, { setErrors: _setErrors }): Promise<void> => {
                setEditBalance(!editBalance);
              }}
            >{({ isSubmitting }): JSX.Element => (
                <Form>
                  <MoneyInput name='balance' label='Update balance' value={stateBalance} onValueChange={handleAmountChange}/>
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
// <InputField name='balance' label='Update Balance:' type='number' />
