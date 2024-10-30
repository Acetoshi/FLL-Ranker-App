import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Team extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, type: "varchar", width: 100, nullable: false })
  name: string;

  @Field()
  @Column({ type: "varchar", width: 100, nullable: false })
  location: string;

  @Field()
  @Column({ type: "varchar", width: 50, nullable: false })
  contact: string;
}
