import { FC, useEffect, useState } from 'react';
import { handleFormErrorMessages, MoneyInputField, SelectFormInput } from '@finance/react';
import { useTransactionCreateMutation, useTransactionTypeListQuery } from '../../generated/graphql';
import { Form, Formik } from 'formik';
import { convertToMoney } from '@finance/core';
import { Button, useToast } from '@chakra-ui/react';
import styles from '../../pages/app.module.scss';

export interface TransactionAddProps {
  onClickFunction: () => void;
}

export const TransactionAdd: FC<TransactionAddProps> = ({ onClickFunction }) => {
  const [ , transactionCreate ] = useTransactionCreateMutation();
  const [ { data: transactionListData, fetching: transactionListFetching } ] = useTransactionTypeListQuery();
  const [ transactionValue, setTransactionValue ] = useState<number>(0);
  const [ editTransaction, setEditTransaction ] = useState<boolean>(false);
  const [ transactionTypeList, setTransactionTypeList ] = useState<JSX.Element[] | null>(null);
  const toast = useToast();

  const handleValueChange = (value: number | null): void => {
    setTransactionValue(value || 0);
  };

  useEffect(() => {
    if (!transactionListFetching && transactionListData?.transactionTypeList) {
      setTransactionTypeList(transactionListData.transactionTypeList?.map((transactionType) => {
        return (
          <option
            key={transactionType.id}
            value={transactionType.transactionType}>
            {transactionType.transactionType}
          </option>
        );
      }));
    }
  }, [ transactionListData?.transactionTypeList, transactionListFetching ]);

  return (
    <>
      <Formik
        initialValues={{ amount: transactionValue, transactionType: '' }}
        onSubmit={async (values, { setErrors, resetForm }): Promise<void> => {
          values.amount = transactionValue;
          const createTransactionResponse = await transactionCreate({
            input: {
              amount: values.amount,
              transactionType: values.transactionType
            }
          });
          console.log('transactionResponse', createTransactionResponse);
          if (handleFormErrorMessages(createTransactionResponse, setErrors, toast)) {
            toast({
              title: 'Creation of Transaction Success',
              description: `Created transaction of ${convertToMoney(createTransactionResponse.data?.transactionCreate.amount ?? values.amount)}`,
              status: 'success',
              isClosable: true
            });
            setEditTransaction(!editTransaction);
            onClickFunction();
            resetForm();
          }
        }}

      >{({ isSubmitting, resetForm }): JSX.Element => (
          <Form className={styles.spacedRows} noValidate>
            <SelectFormInput label={'Transaction Type'} placeholder={'Select Type'} name={'transactionType'}>
              {transactionTypeList}
            </SelectFormInput>
            <MoneyInputField
              name={'amount'}
              value={transactionValue}
              getNumberValue={handleValueChange}
              placeholder={'0.00'}
              label={'Transaction Amount'}
            />
            <Button isLoading={isSubmitting} type='submit' colorScheme='green'>&#10003;</Button>
            <Button type='reset' onClick={(): void => {
              resetForm();
              console.log('yes');
              onClickFunction();
            }} colorScheme='red'>&#10005;</Button>
          </Form>
        )}
      </Formik>
    </>
  );
};



