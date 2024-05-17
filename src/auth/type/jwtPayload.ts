export interface ResetTokenPayload {
  userId: string;
}

export interface AccessTokenPayload {
  userId: string;
}

export interface RefreshTokenPayload {
  userId: string;
  tokenVersion: number;
}
