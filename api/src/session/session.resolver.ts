import { Resolver, InputType, Field, Mutation, Arg } from "type-graphql";
import { IsNumber, IsString, Length } from "class-validator";
import { Session } from "./session.entity";
import { Competition } from "../competition/competition.entity";
import { Team } from "../team/team.entity";
import { Jury } from "../jury/jury.entity";

@InputType()
class SessionInput implements Partial<Session> {
  @Field()
  @IsString()
  @Length(2, 100)
  startTime: string;

  @Field()
  @IsString()
  @Length(2, 100)
  endTime: string;

  @Field()
  @IsNumber()
  competitionId: number;

  @Field()
  @IsNumber()
  teamId: number;

  @Field()
  @IsNumber()
  juryId: number;
}

@Resolver(Session)
export default class SessionResolver {
  @Mutation(() => Session)
  async addSession(@Arg("session") newSession: SessionInput) {
    try {
      const sessionToInsert = new Session();

      const competition = await Competition.findOneBy({
        id: newSession.competitionId,
      });
      const team = await Team.findOneBy({
        id: newSession.teamId,
      });
      const jury = await Jury.findOneBy({
        id: newSession.juryId,
      });

      if (!competition) throw new Error(`Competition not found`);
      if (!team) throw new Error(`Team not found`);
      if (!jury) throw new Error(`Jury not found`);

      sessionToInsert.startTime = newSession.startTime;
      sessionToInsert.endTime = newSession.endTime;
      sessionToInsert.competition = competition;
      sessionToInsert.team = team;
      sessionToInsert.jury = jury;

      return await sessionToInsert.save();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create a new session");
    }
  }
}
