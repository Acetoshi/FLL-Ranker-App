import { IsString, IsNotEmpty, Length, validate } from "class-validator";
import { Resolver, Query, Mutation, InputType, Field, Arg } from "type-graphql";
import { Jury } from "./jury.entity";
import { User } from "./../user/user.entity";

@InputType()
class CreateJuryInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
}

@InputType()
class UserJuryInput {
  @Field()
  @IsNotEmpty()
  juryId: number;

  @Field()
  @IsNotEmpty()
  userId: number;
}

@Resolver(Jury)
export default class JuryResolver {
  @Query(() => [Jury])
  async getAllJuries() {
    return await Jury.find({
      relations: {
        users: true,
        competition: true,
      },
    });
  }

  // @Query(() => Jury)
  // set as private for now, no need to be exposed publically
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

  //@Query(() => [Jury])
  // set as private for now, no need to be exposed publically
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
    try {
      const jury = new Jury();
      jury.name = data.name;

      const error = await validate(jury);
      if (error.length > 0) throw new Error(`Validation Error: ${error}`);

      await jury.save();
      return jury;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create a new jury");
    }
  }

  @Mutation(() => User)
  async addUserToJury(@Arg("data") addUserToJury: UserJuryInput) {
    try {
      const jury: Jury = await Jury.findOneOrFail({
        where: {
          id: addUserToJury.juryId,
        },
        relations: {
          users: true,
        },
      });

      const theUser: User = await User.findOneOrFail({
        where: {
          id: addUserToJury.userId,
        },
        relations: {
          juries: true,
        },
      });

      // user has already been assigned to the jury
      if (jury.users.find((user) => user.id === addUserToJury.userId))
        return theUser;

      theUser.juries.push(jury);
      await theUser.save();

      return theUser;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to bind a user to a jury");
    }
  }

  @Mutation(() => User)
  async removeUserFromJury(@Arg("data") data: UserJuryInput) {
    try {
      const user = await User.findOneOrFail({
        where: {
          id: data.userId,
        },
        relations: {
          juries: true,
        },
      });

      const userAttachedToJury = user.juries.find(
        (jury) => jury.id === data.juryId
      );

      if (userAttachedToJury) {
        user.juries = user.juries.filter((jury) => jury.id !== data.juryId);
        await user.save();
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to remove a user from a jury");
    }
  }
}
