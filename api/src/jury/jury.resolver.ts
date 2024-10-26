import { IsString, IsNotEmpty, Length } from "class-validator";
import { Resolver, Query, Mutation, InputType, Field, Arg } from "type-graphql";
import { validate } from "class-validator";
import { Jury } from "./jury.entity";

@InputType()
class CreateJuryInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}

@Resolver(Jury)
export default class JuryResolver {
  @Query(() => [Jury])
  async getAllJuries() {
    return await Jury.find({
      relations: {
        users: true,
      },
    });
  }

  @Query(() => [Jury])
  async getUsersOfJury(@Arg("juryId") juryId: number) {
    return await Jury.find({
      where: {
        id: juryId,
      },
      relations: {
        users: true,
      },
    });
  }

  @Mutation(() => Jury)
  async createNewJury(@Arg("data") data: CreateJuryInput) {
    const jury = new Jury();
    jury.name = data.name;

    const error = await validate(jury);
    if (error.length > 0) throw new Error(`Validation Error: ${error}`);

    await jury.save();
    return jury;
  }
}
