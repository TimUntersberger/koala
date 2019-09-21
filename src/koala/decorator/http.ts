import KoaRouter from "koa-router";
import { addRouteToKoaRouter, createHttpMethodHandler } from "./util";
import compose from "koa-compose";
import {
  getRouteHandlers,
  emptyRouteHandlers,
  addRoute,
  getRoutes
} from "./state";

export const Router = (path: string) => (_target: any) => {
  addRoute({
    path,
    handlers: getRouteHandlers()
  });
  emptyRouteHandlers();
};

export const GET = createHttpMethodHandler("GET");
export const POST = createHttpMethodHandler("POST");
export const PUT = createHttpMethodHandler("PUT");
export const DELETE = createHttpMethodHandler("DELETE");
export const PATCH = createHttpMethodHandler("PATCH");
export const OPTIONS = createHttpMethodHandler("OPTIONS");

export const getMiddleware = () =>
  compose(
    getRoutes().map(route => {
      const router = new KoaRouter({ prefix: route.path });
      addRouteToKoaRouter(route, router);
      console.log(router.stack);
      return router.routes();
    })
  );
