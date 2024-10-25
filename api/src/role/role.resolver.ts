import { IsString, IsNotEmpty, Length } from "class-validator";
import { Resolver, Mutation, InputType, Field, Arg } from "type-graphql";
import { validate } from "class-validator";
import { Role } from "./role.entity";

@InputType()
class CreateRoleInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  label: string;
}

@Resolver(Role)
export default class RoleResolver {
  @Mutation(() => Role)
  async createNewRole(@Arg("data") data: CreateRoleInput) {
    const role = new Role();
    role.label = data.label;

    const error = await validate(role);
    if (error.length > 0) throw new Error(`Validation Error: ${error}`);

    await role.save();
    return role;
  }
}
