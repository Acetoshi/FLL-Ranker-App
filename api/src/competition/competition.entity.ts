import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import { Jury } from "../jury/jury.entity";

@ObjectType()
@Entity()
export class Competition extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, type: "varchar", width: 30 })
  name: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  date: string;

  @Field(() => [Jury])
  @OneToMany(() => Jury, (jury) => jury.competition)
  juries: Jury[];
}
