import { Resolver, Query, Mutation, InputType, Field, Arg } from "type-graphql";
import { IsString, IsDateString, Length } from "class-validator";
import { Competition } from "./competition.entity";

@InputType()
class CompetitionInput {
  @Field()
  @IsString()
  @Length(3, 100)
  name: string;

  @Field()
  @IsString()
  @Length(2, 100)
  location: string;

  @Field()
  @IsString()
  @IsDateString()
  date: string;
}

@Resolver(Competition)
export default class CompetitionResolver {
  @Query(() => [Competition])
  async getAllCompetitions() {
    return await Competition.find();
  }

  @Query(() => [Competition])
  async getCompetitionById(@Arg("competitionId") competitionId: number) {
    return await Competition.find({
      where: {
        id: competitionId,
      },
      relations: {
        juries: true,
      },
    });
  }

  @Mutation(() => Competition)
  async createCompetition(
    @Arg("competition") newCompetition: CompetitionInput
  ) {
    const competitionToInsert = new Competition();

    competitionToInsert.name = newCompetition.name;
    competitionToInsert.location = newCompetition.location;
    competitionToInsert.date = newCompetition.date;

    const result = await competitionToInsert.save();
    return result;
  }
}
