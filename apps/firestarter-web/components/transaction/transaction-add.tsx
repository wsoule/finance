import React, { FC, useEffect, useState } from 'react';
import { useTransactionCreateMutation, useTransactionTypeListQuery } from '../../generated/graphql';
import {
  Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalProps, useToast
} from '@chakra-ui/react';
import { handleFormErrorMessages, MoneyInputField, SelectFormInput } from '@finance/react';
import { convertToMoney } from '@finance/core';
import { Form, Formik } from 'formik';
import styles from './transaction.module.scss';

export type TransactionAddProps = Omit<ModalProps, 'children'>;

export const TransactionAdd: FC<TransactionAddProps> = ({
  isOpen,
  onClose
}) => {
  const [ , transactionCreate ] = useTransactionCreateMutation();
  const [ { data: transactionListData, fetching: transactionListFetching } ] = useTransactionTypeListQuery();
  const [ transactionValue, setTransactionValue ] = useState<number>(0);
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
            value={transactionType.transactionType}
          >
            {transactionType.transactionType}
          </option>
        );
      }));
    }
  }, [ transactionListData?.transactionTypeList, transactionListFetching ]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'2xl'} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ amount: 0, transactionType: '' }}
              onSubmit={async (values, { setErrors }): Promise<void> => {
                values.amount = transactionValue;
                const createTransactionResponse = await transactionCreate({
                  input: {
                    amount: values.amount,
                    transactionType: values.transactionType
                  }
                });
                if (handleFormErrorMessages(createTransactionResponse, setErrors, toast)) {
                  toast({
                    title: 'Creation of Transaction Success',
                    description: `Created transaction of ${convertToMoney(createTransactionResponse.data?.transactionCreate.amount ?? values.amount)}`,
                    status: 'success',
                    isClosable: true
                  });
                  setTransactionValue(0);
                  onClose();
                }
              }}
            >{({ isSubmitting }): JSX.Element => (
                <Form className={styles.spacedRows} noValidate>
                  <SelectFormInput mb={3} label={'Transaction Type'} placeholder={'Select Type'} name={'transactionType'}>
                    {transactionTypeList}
                  </SelectFormInput>
                  <MoneyInputField
                    name={'amount'}
                    value={transactionValue}
                    getNumberValue={handleValueChange}
                    placeholder={'0.00'}
                    label={'Transaction Amount'}
                    size={'lg'}
                  />
                  <ModalFooter>
                    <Button mr={2} isLoading={isSubmitting} type='submit' colorScheme='green'>&#10003;</Button>
                    <Button ml={2} type='reset' onClick={(): void => {
                      setTransactionValue(0);
                      onClose();
                    }} colorScheme='red'>&#10005;</Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>

    </>
  );
};



