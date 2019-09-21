import { Router, GET, Context } from "../koala";
import * as DI from "../di";

/**
 * Change the jwt
 */

@Router("/")
class Index {
  // middlewares have to be underneath the http method decorator
  @GET()
  home(ctx: Context): void {
    ctx.body = DI.getMessage();
    ctx.status = 200;
  }
}
