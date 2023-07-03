import { GraphQLError } from 'graphql';

export class BaseError extends GraphQLError {
  statusCode: number;

  constructor(
    message: string,
    httpStatusCode: number,
    extensions?: Record<string, any>
  ) {
    super(message, extensions);
    this.statusCode = httpStatusCode;
  }
}