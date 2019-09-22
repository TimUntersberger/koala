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
  createMethodDecorator(async value => {
    addRouteHandler({
      method,
      path,
      middlewares: [],
      handler: value
    });
  });

export function createMethodDecorator(
  cb: (value: Koala.AsyncRouteHandlerCallback) => Promise<void>
): Function;
export function createMethodDecorator(
  cb: (value: Koala.RouteHandlerCallback) => void
): Function;
export function createMethodDecorator(cb: any) {
  return (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    if (descriptor.value) {
      if (cb.constructor.name === "AsyncFunction") cb(descriptor.value);
      else cb(descriptor.value);
    }
  };
}

export const createClassDecorator = (cb: () => void) => (_target: any) => cb();
