import { BaseError, ErrorCode } from './base-error';

export class AuthenticationError extends BaseError {
  override readonly name = 'AuthenticationError';

  constructor(message?: string) {
    super(message ?? 'Not Authenticated.', ErrorCode.authenticationError);
  }
}
