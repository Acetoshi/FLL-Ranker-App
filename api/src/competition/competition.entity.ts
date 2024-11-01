import "reflect-metadata";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";

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
}
