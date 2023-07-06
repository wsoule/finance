import { FormArrayErrors } from './form-array-errors';
import { FormControlErrors } from './form-control-errors';
import { FormGroupErrors } from './form-group-errors';

export type FormErrors<T> =
  T extends T[keyof(T)][]
    ? FormArrayErrors<T>
    : T extends object
      ? FormGroupErrors<T>
      : FormControlErrors;
      