import {
  FC,
  useEffect,
  useState
} from 'react';
import {
  Button,
  Stat,
  StatHelpText,
  StatNumber,
  Text,
  useToast
} from '@chakra-ui/react';
import {
  useTransactionDeleteMutation,
  useTransactionTypeDetailsQuery
} from '../../generated/graphql';
import { convertToMoney } from '@finance/core';
import { Divider } from '@chakra-ui/layout';
import {
  handleFormErrorMessages,
  Link
} from '@finance/react';
import { useRouter } from 'next/router';
import { LinkIcon } from '@chakra-ui/icons';
import styles from './transaction.module.scss';
import {
  Form,
  Formik
} from 'formik';

export interface TransactionProps {
  transactionID: string;
  transactionType: number;
  transactionAmount: number;
}

export const Transaction: FC<TransactionProps> = ({
  transactionID,
  transactionType,
  transactionAmount
}) => {
  const router = useRouter();
  const [ , deleteTransaction ] = useTransactionDeleteMutation();
  const [ transactionTypeString, setTransactionTypeString ] = useState<null | string>(null);
  const [ transactionDeleteElement, setTransactionDeleteElement ] = useState<JSX.Element>();
  const [ toggleDeleteForm, setToggleDeleteForm ] = useState<boolean>(false);
  const toast = useToast();
  const [ { data: transactionTypeData, fetching: transactionTypeFetching } ] = useTransactionTypeDetailsQuery({
    variables: {
      input: { transactionTypeID: transactionType }
    }
  });
  useEffect(() => {
    setTransactionTypeString(transactionTypeData?.transactionTypeDetails?.transactionType || 'Loading...');
  }, [ transactionTypeData, transactionTypeData?.transactionTypeDetails?.transactionType, transactionTypeFetching ]);

  useEffect(() => {
    if (toggleDeleteForm) {
      setTransactionDeleteElement(
        <>
          <Formik
            initialValues={{ transactionID: '' }}
            onSubmit={async (values, { setErrors }): Promise<void> => {
              values.transactionID = transactionID;
              const deleteTransactionResponse = await deleteTransaction({
                input: values
              });
              if (handleFormErrorMessages(deleteTransactionResponse, setErrors, toast)) {
                toast({
                  title: 'Deleted Transaction',
                  description: transactionID,
                  status: 'success',
                  isClosable: true
                });
                setToggleDeleteForm(!toggleDeleteForm);
              }
            }}
            onReset={(): void => setToggleDeleteForm(!toggleDeleteForm)}
          >{({ isSubmitting }): JSX.Element => (
              <Form>
                <Button mb={2} mr={2} type={'submit'} isLoading={isSubmitting} colorScheme={'red'}>Confirm</Button>
                <Button mb={2} type={'reset'}>Cancel</Button>
              </Form>
            )}
          </Formik>
        </>
      );
    } else {
      setTransactionDeleteElement(
        <Button mb={2} onClick={(): void => {
          setToggleDeleteForm(!toggleDeleteForm);
        }}>Delete</Button>
      );
    }
  }, [ deleteTransaction, toast, toggleDeleteForm, transactionID ]);

  return (
    <Stat key={transactionID} id={transactionID} borderWidth={'1px'} borderRadius={'lg'} padding={2} margin={'2rem'}>
      <>
        <StatNumber color={transactionAmount > 0 ? 'green.400' : 'red.400'}>
          {convertToMoney(transactionAmount)}
        </StatNumber>
        {/*{!toggleTransactionValue*/}
        {/*  ? (<StatNumber onClick={(): void => {*/}
        {/*    setToggleTransactionValue(!toggleTransactionValue);*/}
        {/*  }} color={transactionAmount > 0 ? 'green.400' : 'red.400'}>*/}
        {/*    {convertToMoney(transactionAmount)}*/}
        {/*  </StatNumber>)*/}
        {/*  : <MoneyInput name={'balance'} onBlur={(): void => {*/}
        {/*    setToggleTransactionValue(!toggleTransactionValue);*/}
        {/*  }} autoFocus={true} placeholder={transactionAmount.toFixed(2)} getNumberValue={stuff} />*/}
        {/*}*/}
      </>
      <StatHelpText>
        <Text className={'noCursorChange'} fontSize={'xl'}>Transaction Type</Text>
        <Text fontSize={'xl'} mb={2}>{transactionTypeString}</Text>
        {transactionDeleteElement}
        <Divider />
        <Text className={'noCursorChange'} fontWeight={'bold'} mt={2}>TransactionID</Text>
        <Link className={styles.link} route={`${router.basePath}#${transactionID}`}>
          {transactionID}
          <LinkIcon className={styles.linkIcon} ml={2} /></Link>
      </StatHelpText>
    </Stat>
  );
};

// test stuff:import { render } from '@testing-library/react';
// import { Transaction } from './transaction';
// import { MockUrqlProvider } from '../../functions/testing';
// import { useRouter } from 'next/router';
//
// jest.mock('next/router', () => ({
//   useRouter: jest.fn()
// }));
//
// describe('Transaction', () => {
//   it('should render successfully', () => {
//     useRouter();
//     const { baseElement } = render(
//       <MockUrqlProvider>
//         <Transaction
//           transactionID={'1'}
//           transactionType={1}
//           transactionAmount={1}
//         />
//       </MockUrqlProvider>
//     );
//     expect(baseElement).toBeTruthy();
//   });
// });

