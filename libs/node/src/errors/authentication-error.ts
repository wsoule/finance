import { BaseError } from './base-error';

export class AuthenticationError extends BaseError {
  override readonly name = 'AuthenticationError';

  constructor(message?: string) {
    super(message ?? 'Not Authenticated.', 403, { code: 'AUTHENTICATION_ERROR'});
  }
}