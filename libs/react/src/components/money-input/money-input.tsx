import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react';
import { useField } from 'formik';
import { InputFieldProps } from '../input-field';
import _cssStyles from './money-input.module.scss';
import { ChangeEvent, FC, useState } from 'react';

export interface MoneyInputProps extends Omit<InputFieldProps, 'ispassword' | 'textarea'> {
  onValueChange: (value: number | null) => void;
}

export const MoneyInput: FC<MoneyInputProps> = ({
  error,
  label,
  size: _defaultedSize,
  onValueChange,
  ...props
}) => {
  const [ field, { touched, error: fieldError } ] = useField(props);
  const [ inputString, setInputString ] = useState<string>('');
  const dollarColor = useColorModeValue('gray', 'gray.500');
  const updateInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const eventTarget = event.target.value;
    const unformattedValue = (eventTarget[eventTarget.length-1] === '-')
      ? (-1 * parseFloat(eventTarget.replace(/,/g, '')))
      : parseFloat(eventTarget.replace(/,/g, ''));
    const formattedValue = ((eventTarget === '-')
      ? eventTarget
      : unformattedValue.toLocaleString()
        + ((eventTarget.match(/(\.0*)(?!\d)/))
          ? eventTarget.match(/(\.0*)(?!\d)/)?.[1]
          : ''));
    if (formattedValue.match(/^-?(?:\d{1,3}(?:,\d{3})*(?:\.\d{0,2})?)?$/)) {
      setInputString(formattedValue);
      onValueChange(unformattedValue);
    } else if (isNaN(parseFloat(formattedValue))) {
      setInputString('');
      onValueChange(null);
    }
  };

  return (
    <FormControl isInvalid={!!fieldError && touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          color={dollarColor}
          fontSize='1.2em'
          children='$'
        />
        <Input
          {...field}
          {...props}
          value={inputString}
          onChange={updateInput}
        />
      </InputGroup>
      <FormErrorMessage>{fieldError}</FormErrorMessage>
    </FormControl>
  );
};
