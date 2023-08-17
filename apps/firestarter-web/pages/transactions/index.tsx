import { FC, useEffect, useState } from 'react';
import { Page } from '../../components';
import { useTransactionDetailsQuery } from '../../generated/graphql';
import { Heading } from '@chakra-ui/react';
import { useAuthenticatedGuard } from '../../guards';
import { Transaction } from '../../components/transaction';

const loggedInGuards = [ useAuthenticatedGuard ];

export const Transactions: FC = () => {
  const [ { data: transactionData, fetching: transactionsFetching } ] = useTransactionDetailsQuery();
  const [ transactionPageContents, setTransactionPageContents ] = useState<JSX.Element | JSX.Element[]>();
  const routeGuards = loggedInGuards.map((guard) => guard());

  useEffect(() => {
    if (transactionsFetching) {
      setTransactionPageContents(<p>hello</p>);
    } else if (!transactionData || transactionData.transactionDetails.length < 1) {
      setTransactionPageContents(<div>NO TRANSACTION DATA</div>);
    } else {
      console.log('transactionDetails amount', transactionData);
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
    <div>
      <Page size={'large'} guards={routeGuards}>
        <Heading>
          Transactions
        </Heading>
        {transactionPageContents}
      </Page>
    </div>
  );
};

export default Transactions;
