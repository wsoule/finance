export type FormControlError = [string, any];

export namespace FormControlError {
  export function isInstance(error: any): error is FormControlError {
    return error instanceof Array && error.length === 2 && typeof error[0] === 'string';
  }
}
