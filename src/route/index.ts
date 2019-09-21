import { Router, GET, Context, PermitAll } from "../koala";

@Router("/")
class Index {
  @GET()
  @PermitAll()
  home(ctx: Context): void {
    ctx.body = ctx.account;
    ctx.status = 200;
  }
}
