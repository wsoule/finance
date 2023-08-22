import { FC, useEffect, useState } from 'react';
import { Stat, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react';
import { useTransactionTypeDetailsQuery } from '../../generated/graphql';
import { convertToMoney } from '@finance/core';
import { Divider } from '@chakra-ui/layout';

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
  const [ transactionTypeString, setTransactionTypeString ] = useState<null | string>(null);
  const [ toggleTransactionValue, setToggleTransactionValue ] = useState<boolean>(false);
  const [ { data: transactionTypeData, fetching: transactionTypeFetching } ] = useTransactionTypeDetailsQuery({
    variables: {
      input: { transactionTypeID: transactionType }
    }
  });
  useEffect(() => {
    setTransactionTypeString(transactionTypeData?.transactionTypeDetails?.transactionType || 'Loading...');
  }, [ transactionTypeData, transactionTypeData?.transactionTypeDetails?.transactionType, transactionTypeFetching ]);
  return (
    <Stat key={transactionID} borderWidth={'1px'} borderRadius={'lg'} padding={2} margin={'2rem'}>
      <StatLabel fontSize={'2xl'}>Transaction Amount</StatLabel>
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
        <Text>{transactionID}</Text>
      </StatHelpText>
    </Stat>
  );
};
