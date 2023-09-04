import { FC } from 'react';
import { useField } from 'formik';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Select, SelectProps } from '@chakra-ui/react';

export interface SelectFormInputProps extends SelectProps {//SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
}

/**
 * A selector component for fields on forms.
 * @param _
 * @param children give array of options for the user to select from
 * @param label the label to display on top of the select
 * @param name name of the select to link back to form
 * @param props
 * @constructor
 */
export const SelectFormInput: FC<SelectFormInputProps> = ({
  size: _,
  children,
  label,
  name,
  mb,
  ...props
}) => {
  const [ field, { touched, error: fieldError } ] = useField(name);
  return (
    <FormControl isInvalid={!!fieldError && touched} mb={mb}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select {...field} {...props} id={field.name} name={field.name}>
        {children}
      </Select>
      <FormErrorMessage>{fieldError}</FormErrorMessage>
    </FormControl>
  );
};