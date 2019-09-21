import { Context as KoaContext, Middleware } from "koa";

export type HttpMethod =
  | "GET"
  | "POST"
  | "DELETE"
  | "PUT"
  | "PATCH"
  | "OPTIONS";

export type AccessTokenPayload<TId = number, TRole = string> = {
  id: TId;
  role: TRole;
};

export type RefreshTokenPayload<TId = number> = {
  id: TId;
  version: number;
};

export type Context<TId = number, TAccount = any> = KoaContext & {
  accessToken?: {
    payload: AccessTokenPayload<TId>;
    raw: string;
  };
  refreshToken?: {
    payload: RefreshTokenPayload<TId>;
    raw: string;
  };
  account?: TAccount;
};

export type RouteHandlerCallback = (context: Context) => void;

export type RouteHandler = {
  path: string;
  method: HttpMethod;
  middlewares: Middleware[];
  handler: RouteHandlerCallback;
};

export interface Route {
  path: string;
  handlers: RouteHandler[];
}
