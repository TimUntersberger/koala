import { Context as KoaContext, Middleware } from "koa";

export type HttpMethod =
  | "GET"
  | "POST"
  | "DELETE"
  | "PUT"
  | "PATCH"
  | "OPTIONS";

export type Context = KoaContext;

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
