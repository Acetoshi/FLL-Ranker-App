import { Field, ObjectType } from "type-graphql";

type Status = "success" | "error";

@ObjectType()
export class ResponseStatus {
  constructor(status: Status, message?: string) {
    this.success = status === "success" ? true : false;
    this.message = message;
  }

  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}
