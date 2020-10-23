import path from "path";
import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    username: "test",
    password: "test",
    database: "typegraphql-example",
    port: 5432,
    synchronize: drop,
    dropSchema: drop,
    entities: [path.join(__dirname, "/../entity/*.*")]
  });
};