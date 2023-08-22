import { Button, Heading, Stat, StatHelpText, StatLabel, StatNumber, Text, useToast } from '@chakra-ui/react';
import { convertToMoney } from '@finance/core';
import { handleFormErrorMessages, Link, Loading, MoneyInputField } from '@finance/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Page } from '../components';
import { useAccountDetailsQuery, useAccountUpdateBalanceMutation, useUserDetailsQuery } from '../generated/graphql';
import styles from './app.module.scss';

export const Index: FC = () => {
  const [ { data: accountData, fetching: accountDetailsFetching } ] = useAccountDetailsQuery();
  const [ , accountBalanceUpdate ] = useAccountUpdateBalanceMutation();
  const [ { data: userData, fetching: userDetailsFetching } ] = useUserDetailsQuery();
  const { balance, updatedAt: accountUpdatedAt, id: accountId } = accountData?.accountDetails ?? { balance: 0 };
  const [ stateBalance, setStateBalance ] = useState<number | null>(balance ?? null);
  const { username, id: userId } = userData?.userDetails ?? {};
  const [ editBalance, setEditBalance ] = useState(false);
  const [ mainPageFormat, setMainPageFormat ] = useState<JSX.Element | null>(null);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    setStateBalance(balance);
  }, [ balance ]);

  /** set the updatedAt number to be a readable format: Day, month date, year, time.*/
  const updatedAtString = (updatedAtNumber: number | undefined): string => {
    return ((updatedAtNumber) ? new Date(updatedAtNumber).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }) : 'no date available');
  };

  const handleAmountChange = (value: number | null): void => {
    setStateBalance(value);
  };
  useEffect(() => {
    if (userDetailsFetching || accountDetailsFetching) {
      setMainPageFormat(<Loading isLoading={true} />);
    } else if (!username) {
      const openRegisterPage = async (): Promise<void> => {
        await router.push(`/register${router.asPath}`);
      };

      const openLoginPage = async (): Promise<void> => {
        await router.push(`/login${router.asPath}`);
      };
      setMainPageFormat(
        <>
          <Heading mb={4}>Welcome to <Text as={'span'} color={'red.500'}>FireStarter</Text></Heading>
          <Text size={'lg'}>
            Manage your FI/RE recourses easily, today with FireStarter
          </Text>
          <Button size={'lg'} mt={'24px'} mr={'12px'} onClick={openRegisterPage}>
            Create Account
          </Button>
          <Button size={'lg'} mt={'24px'} mr={'12px'} onClick={openLoginPage}>
            Login
          </Button>
        </>
      );
    } else {
      const handleEditClick = (): void => {
        setEditBalance(!editBalance);
      };
      setMainPageFormat(
        <>
          <Heading key={userId} mb={4}>Welcome {username}</Heading>
          <Stat borderWidth={'1px'} borderRadius={'lg'} padding={'2'} key={accountId}>
            <StatLabel>Balance</StatLabel>
            <StatNumber>{convertToMoney(balance)}</StatNumber>
            <StatLabel>Last Updated</StatLabel>
            <StatHelpText>{updatedAtString(accountUpdatedAt)}</StatHelpText>
            {!editBalance && (
              <Button onClick={handleEditClick}>Edit</Button>
            )}
            {editBalance && (
              <Formik
                initialValues={{ balance }}
                onSubmit={async (values, { setErrors }): Promise<void> => {
                  values.balance = (stateBalance ?? balance);
                  if (values.balance === balance) {
                    setEditBalance(!editBalance);
                    return;
                  }
                  const balanceUpdateResponse = await accountBalanceUpdate({ input: values });
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
                  <Form className={styles.spacedRows}>
                    <MoneyInputField
                      name='balance'
                      label='Update balance'
                      value={stateBalance || ''}
                      placeholder={balance.toFixed(2).toLocaleString()}
                      getNumberValue={handleAmountChange}
                    />
                    <Button isLoading={isSubmitting} type='submit' colorScheme='green'>&#10003;</Button>
                    <Button type='reset' colorScheme='red'>&#10005;</Button>
                  </Form>
                )}
              </Formik>
            )}
          </Stat>
          <Link label={'transactions'} route={'/transactions'} />
        </>
      );
    }
  }, [
    accountBalanceUpdate,
    accountDetailsFetching,
    accountId,
    accountUpdatedAt,
    balance,
    editBalance,
    router,
    stateBalance,
    toast,
    userDetailsFetching,
    userId,
    username
  ]);
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
