import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import Express from "express";
import session from "express-session";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { createSchema } from "./modules/utils/createSchema";
import { redis } from "./redis";

const main = async () => {
  await createConnection();

  const schema = await createSchema();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res })
  });

  const app = Express();

  const RedisStore = connectRedis(session)

  app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }));

  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: (redis as any),
    }),
    name: "qid",
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };

  app.use(session(sessionOption));

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log(`server started on http://localhost:4000\nand you can open graphql dashboard on http://localhost:4000/graphql`)
    // sendEmail();
  })
}

main();