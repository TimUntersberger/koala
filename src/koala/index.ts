import { bind } from "./di";

export * from "./types";
export * from "./di";
export * from "./decorator/http";
export * from "./decorator/util";
export * from "./decorator/auth";

bind("koala/accessTokenSecret", "secret");
bind("koala/accessTokenExpiresIn", "10m");
bind("koala/refershTokenSecret", "secret2");
bind("koala/refreshTokenExpiresIn", "7d");
bind("koala/errorMessageHeader", "X-Error-Message");
