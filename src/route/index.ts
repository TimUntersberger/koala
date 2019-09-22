import {
  Router,
  GET,
  Context,
  RolesAllowed,
  ParseRefreshToken,
  POST,
  signAccessToken,
  signRefreshToken
} from "../koala";
import Account from "../entity/Account";

@Router("/")
class Index {
  @GET()
  @RolesAllowed(["admin"])
  home(ctx: Context) {
    ctx.body = ctx.account;
    ctx.status = 200;
  }

  @POST()
  async signIn(ctx: Context) {
    const { username, password } = ctx.query;
    const account = await Account.findOne({ username });
    if (account === null) {
      ctx.status = 404;
      return;
    }
    if (account.password !== password) {
      ctx.status = 403;
      return;
    }
    const accessToken = signAccessToken({
      id: account.id,
      role: account.role
    });
    const refreshToken = signRefreshToken({
      id: account.id,
      version: account.refreshTokenVersion
    });
    ctx.cookies.set("jid", refreshToken);
    ctx.set("authorization", "Bearer " + accessToken);
    ctx.status = 200;
    ctx.body = account;
  }

  @POST("refresh")
  @ParseRefreshToken()
  async refresh(ctx: Context) {
    const refreshToken = ctx.refreshToken!;
    const account = await Account.findOne({ id: refreshToken.payload.id });

    const newRefreshToken = signRefreshToken({
      id: refreshToken.payload.id,
      version: refreshToken.payload.version
    });

    const newAccessToken = signAccessToken({
      id: refreshToken.payload.id,
      role: account.role
    });

    ctx.cookies.set("jid", newRefreshToken);
    ctx.set("authorization", newAccessToken);
    ctx.status = 200;
  }
}
