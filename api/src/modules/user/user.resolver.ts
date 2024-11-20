import { Resolver, Query, Arg, Ctx } from "type-graphql";
import { User } from "./user.entity";
import * as jwt from "jsonwebtoken";

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

  @Query(() => Boolean)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx()
    context: { res: { setHeader: (name: string, value: string) => void } }
  ) {
    console.info(email, password);

    const me = { email: "me@me.com", password: "2" };

    if (email === me.email) {
      if (password === me.password) {
        //generate JWT token
        const token = jwt.sign(
          { email: "tex@test.com", name: "me", role: "admin" },
          process.env.API_SECRET_KEY as string
        );
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 24); // Token expires in 24 hours

        context.res.setHeader(
          "Set-Cookie",
          `AuthToken=${token};httpOnly;secure;SameSite=Strict;expires=${expiryDate}`
        ); // see set cookie on MDN
        return true;
      }
    }
    return false;
  }
}
