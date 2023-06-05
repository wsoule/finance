import { GraphQLError } from 'graphql';

// TODO: Methods like this belong on the error classes as `isInstance` methods.
export function isAuthenticationError<T = any>(error: GraphQLError): error is GraphQLError {
  return error && error.extensions.code === 'AUTHENTICATION_ERROR'
}