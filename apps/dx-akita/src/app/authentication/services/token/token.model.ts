export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface JwtPayload {
    sub: string;
    iat?: number;
    exp?: number;
    jti?: string;
    username: string;
}
