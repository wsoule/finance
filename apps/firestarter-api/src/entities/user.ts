import { Ctx, Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { AppContext } from '../types';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  /** When the entity was created. */
  @CreateDateColumn()
  @Field(() => String)
  createdAt!: Date;

  /** Email for communicating with the user. */
  @Column({
    unique: true
  })
  email!: string;

  /** ID of the entity. */
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id!: string;

  /** Password for loggin the user in. */
  @Column({ length: 500 })
  password!: string;

  /** When the entity was updated */
  @UpdateDateColumn()
  @Field(() => String)
  updateAt!: Date;

  /** Username of the user to display to others. */
  @Column({
    length: 50,
    unique: true
  })
  @Field()
  username!: string;

  /** find only username if calling user is in system */
  @Field(() => String, { name: 'email', nullable: true })
  emailField(
    @Ctx() { request }: AppContext
  ): string | null {
    return (request.session.userID === this.id) ? this.email : null;
  }
}
