import { bind } from "./koala";
import Account from "./entity/Account";

export const getAccessTokenSecret = bind("koala/accessTokenSecret", "test");
export const getAccountEntity = bind("koala/typeorm/account", Account);
