export interface IJwtPayload {
  sub: number;
  email: string;
  iat?: Date;
}
