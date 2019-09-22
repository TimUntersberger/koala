export default {
  findOne(_: { username?: string; id?: number }) {
    return Promise.resolve({
      role: "admin",
      username: "tim",
      password: "test",
      refreshTokenVersion: 0,
      id: 1
    });
  }
};
