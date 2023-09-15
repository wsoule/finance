import {
  FC,
  useEffect,
  useState
} from 'react';
import {
  Page,
  TransactionAdd,
  Transaction
} from '../../components';
import {
  useTransactionDetailsQuery
} from '../../generated/graphql';
import {
  Button,
  Heading,
  Spinner,
  Text
} from '@chakra-ui/react';
import { useAuthenticatedGuard } from '../../guards';
import { Loading } from '@finance/react';
import { useRouter } from 'next/router';

const loggedInGuards = [ useAuthenticatedGuard ];

export const TransactionsPage: FC = () => {
  const router = useRouter();
  const showModal = router.query['create-transaction'];
  // const [ pageNumber, setPageNumber ] = useState<number>(1);
  const [ { data: transactionData, fetching: transactionsFetching } ] = useTransactionDetailsQuery();
  // const [ { data: transactionData, fetching: transactionsFetching } ] = useTransactionDetailsArrayQuery({
  //   variables: {
  //     pageNumber: { pageNumber }
  //   }
  // });
  const [ transactionPageContents, setTransactionPageContents ] = useState<JSX.Element | JSX.Element[]>();
  const routeGuards = loggedInGuards.map((guard) => guard());

  // const loadMoreData = (): void => {
  //   setPageNumber((prevPageNumber) => prevPageNumber + 1);
  // };

  useEffect(() => {
    const transactionArray = transactionData?.transactionDetails;
    if (transactionsFetching && !transactionArray) {
      setTransactionPageContents(
        <Loading isLoading={transactionsFetching} loadingText={'Loading Transactions...'} />
      );
    } else if (!transactionData || !transactionArray || transactionArray.length < 1) {
      setTransactionPageContents(<Text>NO TRANSACTION DATA</Text>);
    } else {
      setTransactionPageContents(transactionArray.map((transactionDetails) => {
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
            <Button mt={3} onClick={async (): Promise<void> => {
              await router.push(`${router.basePath}?create-transaction=true`);
            }}>Create Transaction</Button>
            <TransactionAdd isOpen={!!showModal} onClose={async (): Promise<void> => {
              await router.push(router.basePath);
            }} />
            {transactionPageContents}
          </div>
          {/*{(transactionPageContents as JSX.Element[]).length}*/}
          <center>
            {/*<Button isLoading={transactionsFetching} onClick={loadMoreData}>*/}
            {/*  {transactionsFetching*/}
            {/*    ? <Spinner />*/}
            {/*    : <Text>load more</Text>*/}
            {/*  }*/}
            {/*</Button>*/}
          </center>
          {/*<center>{addPageButtonText}</center>*/}
        </Page>
      </div>
    </>
  );
};

export default TransactionsPage;
// TODO - create spec file that has a user that is logged in
