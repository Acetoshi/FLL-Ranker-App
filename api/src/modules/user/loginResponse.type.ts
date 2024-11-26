import { ObjectType, Field } from "type-graphql";

// Define the user details type
@ObjectType()
export class UserDetails {
  @Field()
  email: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  role: string; // Assuming role is a string (e.g., 'admin', 'user', etc.)
}

// Define the login response type
@ObjectType()
export class LoginResponse {
  @Field()
  success: boolean;

  @Field(() => UserDetails, { nullable: true })
  userDetails?: UserDetails;
}
