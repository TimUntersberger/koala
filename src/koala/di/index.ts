import { Subtract } from "../types";
import Jwt from "jsonwebtoken";

export const bindings: { [key: string]: any } = {
  "koala/accessTokenSecret": "secret",
  "koala/accessTokenExpiresIn": "10m",
  "koala/refreshTokenSecret": "secret2",
  "koala/refreshTokenExpiresIn": "7d",
  "koala/errorMessageHeader": "X-Error-Message"
};

export type DefaultBindings = {
  "koala/accessTokenSecret": Jwt.Secret;
  "koala/accessTokenExpiresIn": string;
  "koala/refreshTokenSecret": Jwt.Secret;
  "koala/refreshTokenExpiresIn": string;
  "koala/errorMessageHeader": string;
  "koala/typeorm/account"?: any;
};

/**
 * Gets the dependency bound to the id.
 * @param id Identifier of the dependency to resolve.
 * @returns the dependency or undefined if the id was not found.
 */
export function resolve<
  TId extends keyof DefaultBindings,
  T = DefaultBindings[TId]
>(id: TId): T | undefined;
export function resolve<T = any>(id: string): T | undefined;
export function resolve<T = any>(id: any): T | undefined {
  return bindings[id];
}

/**
 * Binds the dependency to the given id.
 * @param id Unique identifier for resolving the dependency later
 * @param item The dependency to be bound to the id
 * @returns a function for resolving the bound dependency
 */
export function bind<TKey extends keyof DefaultBindings>(
  id: TKey,
  item: DefaultBindings[TKey]
): () => DefaultBindings[TKey] | undefined;
export function bind<T = any, TKey = string>(
  id: Subtract<TKey, keyof DefaultBindings>,
  item: T
): () => T | undefined;
export function bind(id: any, item: any): () => any {
  bindings[id] = item;
  return () => resolve(id);
}
function temp(x: "test"): "test";
function temp<T extends string>(x: Subtract<T, "test">) {
  return x;
}

temp("test");

/**
 * Rebinds the id to a new dependency.
 * @param id Unique identifier for resolving the depndency later
 * @param item The dependency to be bound to the id
 * @returns a function to undo the rebind
 */
export function rebind<T = any>(id: string, item: T): () => void {
  const oldItem = bindings[id];
  bindings[id] = item;
  return () => (bindings[id] = oldItem);
}
