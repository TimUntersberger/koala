import { bind } from "./koala";

export const getMessage = bind("message", "Hello World with DI");
export const getJwtSecret = bind("jwtSecret", "test");
