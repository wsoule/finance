import { FC, useEffect, useState } from 'react';
import { Page } from '../../components';
import { useTransactionDetailsQuery } from '../../generated/graphql';
import { Button, Heading, Text } from '@chakra-ui/react';
import { useAuthenticatedGuard } from '../../guards';
import { Transaction, TransactionAdd } from '../../components/';
import { Loading } from '@finance/react';
import { useRouter } from 'next/router';

const loggedInGuards = [ useAuthenticatedGuard ];

export const TransactionsPage: FC = () => {
  const router = useRouter();
  const showModal = router.query['create-transaction'];
  console.log(showModal);
  const [ { data: transactionData, fetching: transactionsFetching } ] = useTransactionDetailsQuery();
  const [ transactionPageContents, setTransactionPageContents ] = useState<JSX.Element | JSX.Element[]>();
  const routeGuards = loggedInGuards.map((guard) => guard());

  useEffect(() => {
    if (transactionsFetching) {
      setTransactionPageContents(
        <Loading isLoading={transactionsFetching} loadingText={'Loading Transactions...'} />
      );
    } else if (!transactionData || transactionData.transactionDetails.length < 1) {
      setTransactionPageContents(<Text>NO TRANSACTION DATA</Text>);
    } else {
      setTransactionPageContents(transactionData.transactionDetails.map((transactionDetails, index) => {
        return (
          <Transaction
            index={transactionData.transactionDetails.length - index}
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
            <Button mt={3} onClick={async (): Promise<void> => {
              await router.push(`${router.basePath}?create-transaction=true`);
            }}>Create Transaction</Button>
            <TransactionAdd isOpen={!!showModal} onClose={async (): Promise<void> => {
              await router.push(router.basePath);
            }} />
            {transactionPageContents}
          </div>
        </Page>
      </div>
    </>
  );
};

export default TransactionsPage;
// TODO - create spec file that has a user that is logged in
