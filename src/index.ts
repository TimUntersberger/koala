import "./route/index";
import Koa from "koa";
import * as Koala from "./koala";

const app = new Koa();

app.use(Koala.getMiddleware());

app.listen(8000);
