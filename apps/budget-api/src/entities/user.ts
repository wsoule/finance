import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  /** When the entity was created. */
  @CreateDateColumn()
  @Field(() => String)
  createdAt!: Date;

  /** Email for communicating with the user. */
  @Column({
    length: 255,
    unique: true
  })
  @Field()
  email!: string;

  /** ID of the entity. */
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /** Password for loggin the user in. */
  @Column({ length: 500 })
  password!: string;

  /** When the entity was updated */
  @Field(() => String)
  @UpdateDateColumn()
  updateAt!: Date;

  /** Username of the user to display to others. */
  @Column({
    length: 50,
    unique: true
  })
  @Field()
  username!: string;
}
