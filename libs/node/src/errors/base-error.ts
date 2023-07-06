import { GraphQLError } from 'graphql';

export enum ErrorCode {
  authenticationError = 'AUTHENTICATION_ERROR',
  formError = 'FORM_ERROR'
}

export class BaseError extends GraphQLError {
  constructor(
    message: string,
    code: ErrorCode,
    extensions?: Record<string, any>
  ) {
    super(message, { extensions: { code, ...extensions } });
  }
}
