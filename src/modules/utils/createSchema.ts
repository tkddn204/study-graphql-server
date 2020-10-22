import { buildSchema } from "type-graphql";

export const createSchema = () => {
  return buildSchema({
    resolvers: [__dirname + "/../*/*.ts"],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });
}