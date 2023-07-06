import { FC, HTMLInputTypeAttribute, useState } from 'react';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { InputField, InputFieldProps } from '../input-field';
import styles from './password-field.module.scss';
import { useField } from 'formik';

/* eslint-disable-next-line */
export interface PasswordFieldProps {
  label: string;
  name: string;
  error?: string | null;
}

export const PasswordField: FC<PasswordFieldProps> = ({
  ...props
}) => {
  const [ field, { touched, error: fieldError } ] = useField(props);
  const [ showPassword, setShowPassword ] = useState(false);
  const showTextClick = (): void => setShowPassword(!showPassword);

  return (
    <FormControl isInvalid={!!fieldError && touched}>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input
          {...props}
          {...field}
          type={showPassword ? 'text' : 'password'}
          placeholder='password'
        />
        {/*<InputField {...props} type={showText ? 'text' : 'password'} />*/}
        <InputRightElement width='1em'>
          <Button h='1.75em' size='sm' onClick={
            showTextClick
          }>
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{fieldError}</FormErrorMessage>
    </FormControl>
  );
};
