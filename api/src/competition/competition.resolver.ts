import { Resolver, Query, Mutation, InputType, Field, Arg } from "type-graphql";
import {
  IsString,
  IsDateString,
  Length,
  IsOptional,
  IsNumber,
} from "class-validator";
import { Competition } from "./competition.entity";

@InputType()
class CompetitionInput {
  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  id?: number;

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

  @Query(() => Competition)
  async getCompetitionById(@Arg("competitionId") competitionId: number) {
    return await Competition.findOneOrFail({
      where: {
        id: competitionId,
      },
      relations: {
        juries: {
          users: true,
        },
        teams: true,
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

  @Mutation(() => Competition)
  async editCompetition(@Arg("competition") newCompetition: CompetitionInput) {
    try {
      const competitionToEdit = await Competition.findOneBy({
        id: newCompetition.id,
      });
      if (!competitionToEdit) {
        throw new Error(`Competition with ID ${newCompetition.id} not found`);
      } else {
        competitionToEdit.name = newCompetition.name;
        competitionToEdit.location = newCompetition.location;
        competitionToEdit.date = newCompetition.date;

        const result = await competitionToEdit.save();
        return result;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to edit competition");
    }
  }
}
