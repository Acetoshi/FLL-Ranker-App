import { Field, InputType, Int } from "type-graphql";
import { User } from "./user.entity";
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from "class-validator";

@InputType()
export class UserInput implements Partial<User> {
  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @IsEmail()
  @Length(5, 100)
  email: string;

  @Field({ nullable: true })
  @IsString()
  @Length(1, 50)
  firstname: string;

  @Field({ nullable: true })
  @IsString()
  @Length(1, 50)
  lastname: string;

  @Field({ nullable: true })
  @IsString()
  @Length(12, 100)
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,100}$/,
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }
  )
  password: string; // TODO : implement custom regex to check for strength

  @Field(() => Int, { nullable: true })
  @IsNumber()
  roleId: number; // Assuming you will pass the role's ID as a number
}
