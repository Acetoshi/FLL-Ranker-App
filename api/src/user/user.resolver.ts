import { IsString, IsNotEmpty, Length, IsEmail } from "class-validator";
import { Resolver, Query, Mutation, InputType, Field, Arg } from "type-graphql";
import { validate } from "class-validator";
import { User } from "./user.entity";

@InputType()
class CreateUserInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 100)
  email: string;

  @Field()
  @IsString()
  @Length(1, 50)
  firstname: string;

  @Field()
  @IsString()
  @Length(1, 50)
  lastname: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}

@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    return await User.find({
      relations: {
        role: true,
        juries: true,
      },
    });
  }

  @Query(() => [User])
  async getUsersByRole(@Arg("roleId") roleId: number) {
    return await User.find({
      where: {
        role: {
          id: roleId,
        },
      },
      relations: {
        role: true,
        juries: true,
      },
    });
  }

  @Mutation(() => User)
  async createNewUser(@Arg("data") data: CreateUserInput) {
    const user = new User();
    user.firstname = data.firstname;
    user.lastname = data.lastname;

    const error = await validate(user);
    if (error.length > 0) throw new Error(`Validation Error: ${error}`);

    await user.save();
    return user;
  }
}
