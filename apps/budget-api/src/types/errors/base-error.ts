import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';

export enum ErrorCode {
  badUserInput = ApolloServerErrorCode.BAD_USER_INPUT
}

export class BaseError extends GraphQLError {
  constructor(
    message: string,
    code: ErrorCode,
    extensions?: Record<string, any>
  ) {
    super(message, {extensions: { code, ...extensions }});
  }
}