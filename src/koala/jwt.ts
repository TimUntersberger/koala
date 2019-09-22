import { AccessTokenPayload, RefreshTokenPayload } from "./types";
import Jwt from "jsonwebtoken";
import { resolve } from "./di";

export function signAccessToken<T extends AccessTokenPayload>(payload: T) {
  return Jwt.sign(payload, resolve("koala/accessTokenSecret")!, {
    expiresIn: resolve("koala/accessTokenExpiresIn")
  });
}

export function signRefreshToken<T extends RefreshTokenPayload>(payload: T) {
  return Jwt.sign(payload, resolve("koala/refreshTokenSecret")!, {
    expiresIn: resolve("koala/refreshTokenExpiresIn")
  });
}

export function verifyRefreshToken<T extends RefreshTokenPayload>(
  token: string
): T {
  return Jwt.verify(token, resolve<string>("koala/refreshTokenSecret")!) as T;
}
