import {
  FC,
  useEffect,
  useState
} from 'react';
import { Page } from '../../components';
import { useTransactionDetailsQuery } from '../../generated/graphql';
import {
  Heading,
  Text
} from '@chakra-ui/react';
import { useAuthenticatedGuard } from '../../guards';
import { Transaction } from '../../components/transaction';
import { Loading } from '@finance/react';

const loggedInGuards = [ useAuthenticatedGuard ];

export const Transactions: FC = () => {
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
            {transactionPageContents}
          </div>
        </Page>
      </div>
    </>
  );
};

export default Transactions;
// TODO - create test file that has a user that is logged in
