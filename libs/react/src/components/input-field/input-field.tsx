import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input, InputProps } from '@chakra-ui/input';
import { Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ComponentWithAs } from '@chakra-ui/system';
import { Textarea, TextareaProps } from '@chakra-ui/textarea';
import { useField } from 'formik';
import { FC, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export interface InputFieldProps extends InputProps {//InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  textarea?: false;
  error?: string | null;
  ispassword?: true;
}

export interface TextareaFieldProps extends TextareaProps {//InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  textarea: true;
  error?: string | null;
  ispassword?: never;
}

export const InputField: FC<InputFieldProps | TextareaFieldProps> = ({
  error,
  label,
  size: _,
  textarea,
  ispassword,
  ...props
}) => {
  const [ field, { touched, error: fieldError } ] = useField(props.name);
  const [ showPassword, setShowPassword ] = useState(!ispassword);
  const Control = ((textarea) ? Textarea : Input) as ComponentWithAs<'input' | 'textarea', InputProps | TextareaProps>;

  const handleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  if (textarea && ispassword) {
    throw new Error('cannot be a password & text area!');
  }

  return (
    <FormControl isInvalid={!!fieldError && touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup size='md'>
        <Control {...field} {...props} type={(showPassword && !textarea) ? 'text' : 'password'} />
        {ispassword && !textarea && (
          <InputRightElement>
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
