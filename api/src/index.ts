import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./db/data-source";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import setCookie from "set-cookie-parser";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import TeamResolver from "./modules/team/team.resolver";
import JuryResolver from "./modules/jury/jury.resolver";
import UserResolver from "./modules/user/user.resolver";
import CompetitionResolver from "./modules/competition/competition.resolver";
import SessionResolver from "./modules/session/session.resolver";

dotenv.config();
const { API_PORT } = process.env;

(async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [
      TeamResolver,
      JuryResolver,
      UserResolver,
      CompetitionResolver,
      SessionResolver,
    ],
    validate: true,
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: API_PORT as undefined | number },
    context: async ({ req, res }) => {
      if (!req.headers.cookie) return { res };
      const cookies = setCookie.parse(req.headers.cookie as string, {
        map: true,
      });
      if (!cookies.AuthToken) return { res };
      const payload = jwt.verify(
        cookies.AuthToken.value,
        process.env.API_SECRET_KEY as string
      );
      if (!payload) return { res };
      return { res, cookie: payload };
    },
  });

  console.info(`🚀  Server ready at: ${url}`);
})();
