import { bind } from "./koala";

export const getAccessTokenSecret = bind("koala/accessTokenSecret", "test");
export const getAccountEntity = bind("koala/typeorm/account", {
  findOne() {
    return Promise.resolve({
      username: "tim",
      id: 1
    });
  }
});
