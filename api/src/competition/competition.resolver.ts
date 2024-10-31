import { Competition } from "./competition.entity";
import { Resolver, Query } from "type-graphql";

@Resolver(Competition)
export default class CompetitionResolver {
  @Query(() => [Competition])
  async getAllCompetitions() {
    return await Competition.find();
  }
}
