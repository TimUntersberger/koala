import * as Koala from "../types";
import { Middleware } from "koa";
import { CLIENT_RENEG_LIMIT } from "tls";

let routeHandlers: Koala.RouteHandler[] = [];
let middlewares: Middleware[] = [];

const routes: Koala.Route[] = [];

export function addRouteHandler(h: Koala.RouteHandler) {
  console.log("adding handler");
  routeHandlers.push(h);
}

export function emptyRouteHandlers() {
  console.log("emptying handlers");
  routeHandlers = [];
}

export function addMiddleware(m: Middleware) {
  console.log("adding middlware");
  middlewares.push(m);
}

export function emptyMiddlewares() {
  console.log("emptying middlwares");
  middlewares = [];
}

export function addRoute(r: Koala.Route) {
  console.log("adding route");
  middlewares = [];
  routes.push(r);
}

export function getRoutes() {
  return routes;
}

export function getRouteHandlers() {
  return routeHandlers;
}

export function getMiddlewares() {
  return middlewares;
}
