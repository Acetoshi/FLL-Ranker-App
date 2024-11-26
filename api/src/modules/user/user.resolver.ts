import { Resolver, Query, Arg, Ctx, Mutation } from "type-graphql";
import * as jwt from "jsonwebtoken";
import argon2 from "argon2";
import { User } from "./user.entity";
import { UserInput } from "./user.input";
import { Role } from "../role/role.entity";
import verifyPassword from "./verifyPassword.util";
import { LoginResponse } from "./loginResponse.type";

@Resolver(User)
export default class UserResolver {
  // TODO : protect mutation with roles
  @Mutation(() => User)
  async createUser(@Arg("user") newUser: UserInput): Promise<User> {
    const existingUser = await User.findOne({
      where: { email: newUser.email },
    });
    if (existingUser) {
      throw new Error("Bad user input"); // can't say that the mail already exists to protect against brute-force attacks
    }

    const hashedPassword = await argon2.hash(newUser.password); // no need to generate salt here, cause argon2 does it for us

    const role = await Role.findOne({ where: { id: newUser.roleId } });
    if (!role) {
      throw new Error("Role not found");
    }

    const userToInsert = new User();

    userToInsert.email = newUser.email;
    userToInsert.firstname = newUser.firstname;
    userToInsert.lastname = newUser.lastname;
    userToInsert.password = hashedPassword;
    userToInsert.role = role;

    return await userToInsert.save();
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

  @Query(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx()
    context: { res: { setHeader: (name: string, value: string) => void } }
  ) {
    const user = await User.findOne({
      where: { email: email },
      relations: {
        role: true,
      },
    });

    if (!user) return { success: false };

    const passwordMatches = await verifyPassword(user.password, password);

    if (passwordMatches) {
      const userDetails = {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role.label,
      };

      const token = jwt.sign(userDetails, process.env.API_SECRET_KEY as string);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 24); // Token expires in 24 hours

      context.res.setHeader(
        "Set-Cookie",
        `AuthToken=${token};SameSite=Strict;expires=${expiryDate}`
      ); // only use secure when https is available
      // httpOnly was deactivated so that the AuthContext can read values for user name, ect directly from the cookie.
      return { success: true, userDetails };
    } else {
      return { success: false };
    }
  }

  @Mutation(() => Boolean)
  async logout(
    @Ctx()
    context: {
      res: { setHeader: (name: string, value: string) => void };
    }
  ) {
    try {
      // Set the cookie expiration to a past date to invalidate it
      context.res.setHeader(
        "Set-Cookie",
        "AuthToken=; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
      );
      return true;
    } catch {
      return false;
    }
  }
}
