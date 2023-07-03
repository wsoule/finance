import { FormArrayErrorMessages } from './form-array-error-messages';
import { FormControlErrorMessages } from './form-control-error-messages';
import { FormGroupErrorMessages } from './form-group-error-messages';

export type FormErrorMessages<T> =
T extends T[keyof(T)][]
  ? FormArrayErrorMessages<T>
  : T extends object
    ? FormGroupErrorMessages<T>
    : FormControlErrorMessages;
    