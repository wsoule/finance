import { FC, useEffect, useState } from 'react';
import { Stat, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react';
import { convertToMoney } from '@finance/core';
import { useTransactionTypeDetailsQuery } from '../../generated/graphql';
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
      <StatNumber color={transactionAmount > 0 ? 'green.400' : 'red.400'}>
        {convertToMoney(transactionAmount)}
      </StatNumber>
      <StatHelpText>
        <StatLabel fontSize={'xl'}>Transaction Type</StatLabel>
        <Text fontSize={'xl'} mb={2}>{transactionTypeString}</Text>
        <Divider/>
        <StatLabel mt={2}>TransactionID</StatLabel>
        {transactionID}
      </StatHelpText>
    </Stat>);
};
