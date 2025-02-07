import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { User } from "../user/user.entity";

@ObjectType()
@Entity()
export class Role extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  @Column({ nullable: false, unique: true, type: "varchar", width: 30 })
  label: string;

  // @Field()
  @OneToMany(() => User, (user: User) => user.role)
  users?: User[];
}
