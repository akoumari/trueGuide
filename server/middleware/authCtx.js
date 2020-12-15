import { verify } from "jsonwebtoken";

module.exports = (req) => {

  const context = { isAuth: false, role: null, userId: null };



  context.isAuth = true;
  context.userId = process.env.ACCESS_TOKEN_SECRET;
  context.role = process.env.ACCESS_TOKEN_SECRET;
  return context;
};
