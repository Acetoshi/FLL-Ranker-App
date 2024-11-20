import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Min,
  Max,
} from "class-validator";
import { Role } from "../role/role.entity";
import { Jury } from "../jury/jury.entity";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 100)
  @Column({ nullable: false, unique: true, type: "varchar", width: 100 })
  email: string;

  @Field(() => String)
  @IsString()
  @Length(1, 50)
  @Column({ nullable: true, type: "varchar", width: 50 })
  firstname: string;

  @Field(() => String)
  @IsString()
  @Length(1, 50)
  @Column({ nullable: true, type: "varchar", width: 50 })
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false, type: "varchar" })
  password: string;

  @Field(() => Role)
  @Min(1)
  @Max(2)
  @ManyToOne(() => Role, (role: Role) => role.id)
  role: Role;

  @Field(() => [Jury])
  @ManyToMany(() => Jury, (jury) => jury.users)
  @JoinTable()
  juries: Jury[];
}
