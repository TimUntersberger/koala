import { createMethodDecorator } from "./util";
import { addMiddleware } from "./state";
import Jwt from "jsonwebtoken";
import { resolve, bindings } from "../di";
import { Context, AccessTokenPayload } from "../types";

const validateHeader = (ctx: Context) => {
  const header = ctx.get("authorization");
  if (!header) {
    ctx.status = 403;
    return false;
  }
  if (!header.includes("Bearer ")) {
    ctx.status = 400;
    return false;
  }
  return true;
};

const tokenToPayload = (token: string): any => {
  return Jwt.verify(token, resolve<string>("koala/accessTokenSecret")!);
};

export const PermitAll = () =>
  createMethodDecorator(() => {
    addMiddleware(async (ctx: Context, next: Function) => {
      if (!validateHeader(ctx)) return;
      const header = ctx.get("authorization");
      const token = header.split(" ")[1];
      try {
        const payload: AccessTokenPayload = tokenToPayload(token);
        ctx.accessToken = {
          payload,
          raw: token
        };
        const Account = resolve("koala/typeorm/account");
        if (Account) {
          ctx.account = await Account.findOne({
            where: { id: payload.id }
          });
        }
        next();
      } catch (err) {
        ctx.set(resolve<string>("koala/errorMessageHeader")!, err.message);
        ctx.status = 400;
      }
    });
  });
