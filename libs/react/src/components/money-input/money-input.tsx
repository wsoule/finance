import { FormControl, FormLabel, Input, InputGroup, InputLeftAddon, InputLeftElement, NumberInput, NumberInputField, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { ChangeEvent, FC, SetStateAction, useEffect, useRef, useState } from 'react';

import _cssStyles from './money-input.module.scss';
import { InputFieldProps } from '../input-field';
import { useField } from 'formik';

export interface MoneyInputProps extends Omit<InputFieldProps, 'ispassword' | 'textarea'> {
  onValueChange: (value: number) => void;
  value: number;
}

export const MoneyInput: FC<MoneyInputProps> = ({
  error,
  label,
  size: _defaultedSize,
  onValueChange,
  value,
  ...props
}) => {

  const [ field, { touched, error: fieldError } ] = useField(props);
  const [ input, setInput ] = useState<number>(0);
  const [ inputString, setInputString ] = useState<string>('');
  const dollarColor = useColorModeValue('gray', 'gray.500');

  const updateInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const eventTarget = event.target.value;
    const unformattedValue = (eventTarget[eventTarget.length-1] === '-') ? (-1 * parseFloat(eventTarget.replace(/,/g, ''))) : parseFloat(eventTarget.replace(/,/g, ''));
    const formattedValue = ((eventTarget === '-') ? eventTarget : unformattedValue.toLocaleString() + ((eventTarget.match(/(\.0*)(?!\d)/)) ? eventTarget.match(/(\.0*)(?!\d)/)?.[1] : ''));

    if (formattedValue.match(/^-?(?:\d{1,3}(?:,\d{3})*(?:\.\d{0,2})?)?$/)) {
      setInput(unformattedValue);
      setInputString(formattedValue);
    } else if (!eventTarget) {
      setInput(0);
      setInputString('');
    }
    onValueChange(input);
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
    </FormControl>
  );
};
