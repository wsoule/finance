import {
  FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, useColorModeValue
} from '@chakra-ui/react';
import { useField } from 'formik';
import { InputFieldProps } from '../input-field';
import { ChangeEvent, FC, useState } from 'react';

export interface MoneyInputFieldProps extends Omit<InputFieldProps, 'ispassword' | 'textarea' | 'as'> {
  /**Provide a handle function to turn the @value into a number/*/
  getNumberValue?: (value: number | null) => void;
}

/**
 * Input that shows the value as money.
 * @param error
 * @param _defaultedSize
 * @param getNumberValue Provide a handle function to turn the @value into a number.
 * @param fieldProps If MoneyInputProps is being used in a form, pass in the field props here.
 * @param props All of the other props of Input type.
 * @constructor
 */
export const MoneyInputField: FC<MoneyInputFieldProps> = ({
  error,
  getNumberValue,
  label,
  size: _defaultedSize,
  value,
  ...props
}) => {
  // TODO - fix error where you have to enter a value in order to have a negative value
  const [ field, { touched, error: fieldError } ] = useField(props.name);
  const [ formattedValue, setFormattedValue ] = useState<string>('');
  const dollarColor = useColorModeValue('gray', 'gray.500');
  const updateInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const eventTarget = event.target.value;
    const numberValue = ((eventTarget[eventTarget.length - 1] === '-') ? -1 : 1) * parseFloat(eventTarget.replace(/,/g, ''));
    const stringDecimalValue = (eventTarget === '-' && eventTarget.length === 1)
      ? eventTarget
      : (numberValue.toLocaleString() + ((eventTarget.match(/(\.0*)(?!\d)/)?.[1]) ?? ''));
    if (stringDecimalValue.match(/^-?(?:\d{1,3}(?:,\d{3})*(?:\.\d{0,2})?)?$/)) {
      setFormattedValue(stringDecimalValue);
      if (getNumberValue) {
        getNumberValue(numberValue);
      }
    } else if (isNaN(numberValue)) {
      setFormattedValue('');
      if (getNumberValue) {
        getNumberValue(null);
      }
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
          {...props}
          {...field}
          name={field.name}
          id={field.name}
          value={formattedValue}
          onChange={updateInput}
        />
      </InputGroup>
      <FormErrorMessage>{fieldError}</FormErrorMessage>
    </FormControl>
  );
};
