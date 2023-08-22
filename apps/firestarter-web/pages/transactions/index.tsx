import { FC, useEffect, useState } from 'react';
import { Page } from '../../components';
import { useTransactionDetailsQuery } from '../../generated/graphql';
import { Button, Heading, Text } from '@chakra-ui/react';
import { useAuthenticatedGuard } from '../../guards';
import { Transaction, TransactionAdd } from '../../components/transaction';
import { Loading } from '@finance/react';

const loggedInGuards = [ useAuthenticatedGuard ];

export const TransactionsPage: FC = () => {
  const [ { data: transactionData, fetching: transactionsFetching } ] = useTransactionDetailsQuery();
  const [ transactionPageContents, setTransactionPageContents ] = useState<JSX.Element | JSX.Element[]>();
  const routeGuards = loggedInGuards.map((guard) => guard());
  const [ createTransaction, setCreateTransaction ] = useState<boolean>(false);
  const [ transactionCreation, setTransactionCreation ] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const handleCreateTransaction = (): void => {
      setCreateTransaction(!createTransaction);
    };
    if (!createTransaction) {
      setTransactionCreation(
        <Button onClick={handleCreateTransaction}>Create Transaction</Button>
      );
    } else {
      setTransactionCreation(
        <TransactionAdd onClickFunction={handleCreateTransaction} />
      );
    }
  }, [ createTransaction ]);
  useEffect(() => {
    if (transactionsFetching) {
      setTransactionPageContents(
        <Loading isLoading={transactionsFetching} loadingText={'Loading Transactions...'} />
      );
    } else if (!transactionData || transactionData.transactionDetails.length < 1) {
      setTransactionPageContents(<Text>NO TRANSACTION DATA</Text>);
    } else {
      setTransactionPageContents(transactionData.transactionDetails.map((transactionDetails) => {
        return (
          <Transaction
            key={transactionDetails.id}
            transactionAmount={transactionDetails.amount}
            transactionID={transactionDetails.id}
            transactionType={transactionDetails.transactionTypeID}
          />
        );
      }));
    }
  }, [ transactionsFetching, transactionData ]);

  return (
    <>
      <title>Transactions</title>
      <div>
        <Page size={'large'} guards={routeGuards}>
          <Heading>Transactions</Heading>
          <div>
            {transactionCreation}
            {transactionPageContents}
          </div>
        </Page>
      </div>
    </>
  );
};

export default TransactionsPage;
// TODO - create spec file that has a user that is logged in
