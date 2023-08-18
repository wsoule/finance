import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue
} from '@chakra-ui/react';
import {
  FieldInputProps,
  useField
} from 'formik';
import { InputFieldProps } from '../input-field';
import {
  ChangeEvent,
  FC,
  useState
} from 'react';

export interface MoneyInputFieldProps extends Omit<InputFieldProps, 'ispassword' | 'textarea'> {
  /**Provide a handle function to turn the @value into a number/*/
  onValueChange: (value: number | null) => void;
  fieldProps?: FieldInputProps<any>;
}

export type MoneyInputProps = Omit<MoneyInputFieldProps, 'name'>;
/**
 * Input that shows the value as money.
 * @param error
 * @param _defaultedSize
 * @param onValueChange Provide a handle function to turn the @value into a number.
 * @param fieldProps If MoneyInputProps is being used in a form, pass in the field props here.
 * @param props All of the other props of Input type.
 * @constructor
 */
export const MoneyInput: FC<MoneyInputProps> = ({
  error,
  size: _defaultedSize,
  onValueChange,
  fieldProps,
  ...props
}) => {
  const [ inputString2, setInputString2 ] = useState<string>('');
  const dollarColor = useColorModeValue('gray', 'gray.500');
  const updateInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const eventTarget2 = event.target.value;

    const unformattedValue = (eventTarget2[eventTarget2.length - 1] === '-')
      ? (-1 * parseFloat(eventTarget2.replace(/,/g, '')))
      : parseFloat(eventTarget2.replace(/,/g, ''));

    const formattedValue = ((eventTarget2 === '-')
      ? eventTarget2
      : unformattedValue.toLocaleString()
      + ((eventTarget2.match(/(\.0*)(?!\d)/))
        ? eventTarget2.match(/(\.0*)(?!\d)/)?.[1]
        : ''));

    if (formattedValue.match(/^-?(?:\d{1,3}(?:,\d{3})*(?:\.\d{0,2})?)?$/)) {
      setInputString2(formattedValue);
      onValueChange(unformattedValue);
    } else if (isNaN(parseFloat(formattedValue))) {
      setInputString2('');
      onValueChange(null);
    }
  };

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents='none'
        color={dollarColor}
        fontSize='1.2em'
        children='$'
      />
      <Input
        {...fieldProps}
        {...props}
        value={inputString2}
        onChange={updateInput}
      />
    </InputGroup>
  );
};

/**
 * Creates a field item to use the @MoneyInput.
 * @param error Provide any extra errors to show.
 * @param label Label for above the input field.
 * @param _defaultedSize
 * @param onValueChang Provide a handle function pass into @MoneyInput component to turn the @value into a number.
 * @param props The rest of the Props available on @Input component
 * @constructor
 */
export const MoneyInputField: FC<MoneyInputFieldProps> = ({
  error,
  label,
  size: _defaultedSize,
  onValueChange,
  ...props
}) => {
  const [ field, { touched, error: fieldError } ] = useField(props);
  return (
    <FormControl isInvalid={!!fieldError && touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <MoneyInput onValueChange={onValueChange} fieldProps={field} />
      <FormErrorMessage>{fieldError}</FormErrorMessage>
    </FormControl>
  );
};
