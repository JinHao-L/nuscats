/**
 * Payload stored in JWT token to reset password
 */
export interface PasswordResetPayload {
  readonly sub: string;
  readonly hash: string;
  readonly type: 'reset';
}
