import {
  validateNumberControl,
  validateStringControl
} from './validators';

export class ControlValidators {
  public static readonly number = validateNumberControl;
  public static readonly string = validateStringControl;
}
