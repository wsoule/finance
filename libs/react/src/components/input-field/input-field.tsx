import { FC, InputHTMLAttributes, useState } from 'react';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input, InputProps } from '@chakra-ui/input';
import { ComponentWithAs } from '@chakra-ui/system';
import { Textarea, TextareaProps } from '@chakra-ui/textarea';
import { useField } from 'formik';
import { Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  textarea?: false;
  error?: string | null;
  ispassword?: boolean;
}

export interface TextareaFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  textarea: true;
  error?: string | null;
}



export const InputField: FC<InputFieldProps | TextareaFieldProps> = ({ error, label, size: _, textarea, ...props   }) => {
  const isPassword = (props as InputFieldProps).ispassword;
  const [ field, { touched, error: fieldError } ] = useField(props);
  const [ showPassword, setShowPassword ] = useState(!isPassword);
  const Control = ((textarea) ? Textarea : Input) as ComponentWithAs<'input' | 'textarea', InputProps | TextareaProps>;

  const handleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };


  return (
    <FormControl isInvalid={!!fieldError && touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup size='md'>
        <Control {...field} {...props} type={(showPassword && !textarea) ? 'text' : 'password'} id={field.name} />
        { isPassword && (
          <InputRightElement >
            <Button size='sm' onMouseDown={handleShowPassword} onMouseUp={handleShowPassword}>
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{fieldError}</FormErrorMessage>
    </FormControl>
  );
};
