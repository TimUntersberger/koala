import * as Koala from "../types";
import { Middleware } from "koa";

let routeHandlers: Koala.RouteHandler[] = [];
let currentRouteHandler: Koala.RouteHandler = {
  handler: null,
  method: null,
  middlewares: [],
  path: null
} as any;

const routes: Koala.Route[] = [];

export function addRouteHandler(h: Koala.RouteHandler) {
  console.log("adding handler");
  if (
    currentRouteHandler.handler !== null &&
    currentRouteHandler.handler !== undefined
  ) {
    routeHandlers.push(currentRouteHandler);
  }
  currentRouteHandler = h;
}

export function addMiddleware(h: Middleware) {
  console.log("adding middleware");
  currentRouteHandler.middlewares.push(h);
}

export function emptyRouteHandlers() {
  console.log("emptying handlers");
  routeHandlers = [];
}

export function addRoute(r: Koala.Route) {
  console.log("adding route");
  if (
    currentRouteHandler.handler !== null &&
    currentRouteHandler.handler !== undefined
  ) {
    r.handlers.push(currentRouteHandler);
  }
  routes.push(r);
}

export function getRoutes() {
  return routes;
}

export function getRouteHandlers() {
  return routeHandlers;
}

export function getCurrentRouteHandler() {
  return currentRouteHandler;
}
