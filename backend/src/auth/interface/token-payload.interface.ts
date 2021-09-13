/**
 * Payload stored in JWT token to uniquely identify user
 */
export interface TokenPayload {
  readonly sub: string;
  readonly username: string;
}
