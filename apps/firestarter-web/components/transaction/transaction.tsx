import { FC, useEffect, useState } from 'react';
import { Stat, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react';
import { useTransactionTypeDetailsQuery } from '../../generated/graphql';
import { convertToMoney } from '@finance/core';
import { Divider } from '@chakra-ui/layout';
import { Link } from '@finance/react';
import { useRouter } from 'next/router';
import { LinkIcon } from '@chakra-ui/icons';
import styles from './transaction.module.scss';

export interface TransactionProps {
  index: number;
  transactionID: string;
  transactionType: number;
  transactionAmount: number;
}

export const Transaction: FC<TransactionProps> = ({
  index,
  transactionID,
  transactionType,
  transactionAmount
}) => {
  const router = useRouter();
  const [ transactionTypeString, setTransactionTypeString ] = useState<null | string>(null);
  const [ { data: transactionTypeData, fetching: transactionTypeFetching } ] = useTransactionTypeDetailsQuery({
    variables: {
      input: { transactionTypeID: transactionType }
    }
  });
  useEffect(() => {
    setTransactionTypeString(transactionTypeData?.transactionTypeDetails?.transactionType || 'Loading...');
  }, [ transactionTypeData, transactionTypeData?.transactionTypeDetails?.transactionType, transactionTypeFetching ]);
  return (
    <Stat key={transactionID} id={transactionID} borderWidth={'1px'} borderRadius={'lg'} padding={2} margin={'2rem'}>
      <Link className={styles.link} route={`${router.basePath}#${transactionID}`}>
        <LinkIcon mr={2} underlinePosition={'center'} /><StatLabel fontSize={'2xl'}>Transaction #{index}</StatLabel>
      </Link>
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

        <Text fontSize={'xl'}>Transaction Type</Text>
        <Text fontSize={'xl'} mb={2}>{transactionTypeString}</Text>
        <Divider />
        <Text mt={2} fontWeight={'bold'}>TransactionID</Text>
        {transactionID}
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

