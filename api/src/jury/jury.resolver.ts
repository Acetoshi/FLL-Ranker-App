import { IsString, IsNotEmpty, Length } from "class-validator";
import { Resolver, Query, Mutation, InputType, Field, Arg } from "type-graphql";
import { validate } from "class-validator";
import { Jury } from "./jury.entity";
import { User } from "./../user/user.entity";
import UserResolver from "../user/user.resolver";

@InputType()
class CreateJuryInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}

@InputType()
class AddUserToJuryInput {
  @Field()
  @IsNotEmpty()
  juryId: number;

  @Field()
  @IsNotEmpty()
  userId: number;
}

@Resolver(Jury)
export default class JuryResolver {
  // constructor(
  //   @Inject
  // )

  @Query(() => [Jury])
  async getAllJuries() {
    return await Jury.find({
      relations: {
        users: true,
      },
    });
  }

  @Query(() => Jury)
  async getJuryById(@Arg("juryId") juryId: number) {
    return await Jury.findOneOrFail({
      where: {
        id: juryId,
      },
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

  @Mutation(() => Jury)
  async addUserToJury(@Arg("data") addUserToJury: AddUserToJuryInput) {
    const jury: Jury = await this.getJuryById(addUserToJury.juryId);

    // user has already been assigned to the jury
    if (jury.users.find((user) => user.id === addUserToJury.userId))
      return jury;

    const user = new UserResolver();
    const theUser: User = await user.getlUserById(addUserToJury.userId);

    theUser.juries.push(jury);
    await theUser.save();

    return jury;
  }
}
