import * as Koala from "../types";
import Router from "koa-router";
import { addRouteHandler, getMiddlewares, emptyMiddlewares } from "./state";

export const addRouteToKoaRouter = (route: Koala.Route, router: Router) => {
  route.handlers.forEach((h: Koala.RouteHandler) => {
    (router as any)[h.method.toLowerCase()](
      h.path,
      ...h.middlewares,
      h.handler
    );
  });
};

export const createHttpMethodHandler = (method: Koala.HttpMethod) => (
  path: string = "/"
) => (
  _target: any,
  _propertyKey: string,
  descriptor: TypedPropertyDescriptor<Koala.RouteHandlerCallback>
) => {
  if (descriptor.value) {
    addRouteHandler({
      method,
      path,
      middlewares: getMiddlewares(),
      handler: descriptor.value
    });
    emptyMiddlewares();
  }
};
