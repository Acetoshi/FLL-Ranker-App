import { Resolver, Query, Arg } from "type-graphql";
import { User } from "./user.entity";

@Resolver(User)
export default class UserResolver {
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
}
