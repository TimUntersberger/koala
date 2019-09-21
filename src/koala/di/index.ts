export const bindings: any = {};

/**
 * Gets the dependency bound to the id.
 * @param id Identifier of the dependency to resolve.
 * @returns the dependency or undefined if the id was not found.
 */
export function resolve<T = any>(id: string | number): T | undefined {
  return bindings[id];
}

/**
 * Binds the dependecy to the given id.
 * @param id Unique identifier for resolving the dependency later
 * @param item The dependency to be bound to the id
 * @returns a function for resolving the bound dependency
 */
export function bind<T = any>(
  id: string | number,
  item: T
): () => T | undefined {
  bindings[id] = item;
  return () => resolve<T>(id);
}

/**
 * Rebinds the id to a new dependency.
 * @param id Unique identifier for resolving the depndency later
 * @param item The dependency to be bound to the id
 * @returns a function to undo the rebind
 */
export function rebind<T = any>(id: string | number, item: T): () => void {
  const oldItem = bindings[id];
  bindings[id] = item;
  return () => (bindings[id] = oldItem);
}
