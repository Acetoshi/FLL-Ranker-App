import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./db/data-source";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
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
  });

  console.info(`🚀  Server ready at: ${url}`);
})();
