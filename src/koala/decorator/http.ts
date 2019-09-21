import KoaRouter from "koa-router";
import {
  addRouteToKoaRouter,
  createHttpMethodDecorator,
  createClassDecorator
} from "./util";
import compose from "koa-compose";
import {
  getRouteHandlers,
  emptyRouteHandlers,
  addRoute,
  getRoutes
} from "./state";

export const Router = (path: string) =>
  createClassDecorator(() => {
    addRoute({
      path,
      handlers: getRouteHandlers()
    });
    emptyRouteHandlers();
  });

export const GET = createHttpMethodDecorator("GET");
export const POST = createHttpMethodDecorator("POST");
export const PUT = createHttpMethodDecorator("PUT");
export const DELETE = createHttpMethodDecorator("DELETE");
export const PATCH = createHttpMethodDecorator("PATCH");
export const OPTIONS = createHttpMethodDecorator("OPTIONS");

export const getMiddleware = () =>
  compose(
    getRoutes().map(route => {
      console.log(route);
      const router = new KoaRouter({ prefix: route.path });
      addRouteToKoaRouter(route, router);
      return router.routes();
    })
  );
