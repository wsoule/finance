import { FormArrayValidation } from './form-array-validation';
import { FormControlValidation } from './form-control-validation';
import { FormGroupValidation } from './form-group-validation';

export type FormValidation<TypeT> =
  TypeT extends TypeT[keyof(TypeT)][]
    ? FormArrayValidation<TypeT>
    : TypeT extends object
      ? FormGroupValidation<TypeT>
      : FormControlValidation<TypeT>;
      