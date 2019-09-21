import * as Koala from "../types";
import Router from "koa-router";
import { addRouteHandler, getCurrentRouteHandler } from "./state";

export const addRouteToKoaRouter = (route: Koala.Route, router: Router) => {
  route.handlers.forEach((h: Koala.RouteHandler) => {
    (router as any)[h.method.toLowerCase()](
      h.path,
      ...h.middlewares,
      h.handler
    );
  });
};

export const createHttpMethodDecorator = (method: Koala.HttpMethod) => (
  path: string = "/"
) =>
  createMethodDecorator(value => {
    addRouteHandler({
      method,
      path,
      middlewares: getCurrentRouteHandler().middlewares,
      handler: value
    });
  });

export const createMethodDecorator = (
  cb: (value: Koala.RouteHandlerCallback) => void
) => (
  _target: any,
  _propertyKey: string,
  descriptor: TypedPropertyDescriptor<Koala.RouteHandlerCallback>
) => {
  if (descriptor.value) {
    cb(descriptor.value);
  }
};

export const createClassDecorator = (cb: () => void) => (_target: any) => cb();
