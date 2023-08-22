import { FC, SelectHTMLAttributes } from 'react';
import { useField } from 'formik';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Select } from '@chakra-ui/react';

export interface SelectFormInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
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
  ...props
}) => {
  const [ field, { touched, error: fieldError } ] = useField(name);
  return (
    <FormControl isInvalid={!!fieldError && touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select {...field} {...props} name={field.name}>
        {children}
      </Select>
      <FormErrorMessage>{fieldError}</FormErrorMessage>
    </FormControl>
  );
};