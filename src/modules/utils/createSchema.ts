import path from "path";
import { buildSchema } from "type-graphql";

export const createSchema = () =>
  buildSchema({
    resolvers: [path.join(__dirname, "/../*/*.ts")],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });