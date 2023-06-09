import { FC, InputHTMLAttributes } from 'react';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input, InputProps } from '@chakra-ui/input';
import { ComponentWithAs } from '@chakra-ui/system';
import { Textarea, TextareaProps } from '@chakra-ui/textarea';
import { useField } from 'formik';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  textarea?: false;
  error?: string | null;
}

export interface TextareaFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  textarea: true;
  error?: string | null;
}

export const InputField: FC<InputFieldProps | TextareaFieldProps> = ({ error, label, size: _, textarea, ...props }) => {
  const [ field, { touched, error: fieldError } ] = useField(props);
  const Control = ((textarea) ? Textarea : Input) as ComponentWithAs<'input' | 'textarea', InputProps | TextareaProps>;

  return (
    <FormControl isInvalid={!!fieldError && touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Control {...field} {...props} id={field.name} />
      <FormErrorMessage>{fieldError}</FormErrorMessage>
    </FormControl>
  );
};
