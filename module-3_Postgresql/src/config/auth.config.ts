import { Secret, Algorithm } from "jsonwebtoken";

const { SECRET, EXP_IN, HEADER } = process.env;

interface AuthConfig {
    secret: Secret,
    exp_in: number,
    header: string
}

export const authConfig: AuthConfig = {
  secret: SECRET || 'secret',
  exp_in: Number(EXP_IN) || 3600,
  header: HEADER || 'x-access-token'
};
