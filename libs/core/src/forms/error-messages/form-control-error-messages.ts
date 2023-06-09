export interface FormControlErrorMessages {
  control?: string[];
}

export namespace FormControlErrorMessages {
  export function isInstance(
    validation: any
  ): validation is FormControlErrorMessages {
    if (!validation || typeof validation !== 'object') {
      return false;
    }

    const control = (validation as FormControlErrorMessages | null)?.control;

    return control == null || (
      control instanceof Array
      && control.every((message): boolean => typeof message === 'string')
    );
  }
}