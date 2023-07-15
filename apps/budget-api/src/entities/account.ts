import { Ctx, Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { User } from './user';
import { AppContext } from '../types';

@Entity()
@ObjectType()
export class Account extends BaseEntity {

  /** Account Number for the user. */
  @PrimaryGeneratedColumn('uuid')
  @Field()
  accountId!: string;
  
  /** ID of the entity. */
  @Column()
  @OneToOne(() => User)
  // @JoinColumn({ name: 'id'})
  @Field()
  userId!: string;

  /** balance of a user's account. */
  @Column()
  balance!: number;

  /** date when the account is created. */
  @CreateDateColumn()
  @Field(() => Date)
  createdAt!: Date;

  /** date when account was last updated. */
  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt!: Date;

  /** gets the users balance if they have the correct ID. */
  @Field(() => Number, { name: 'balance' })
  balanceField(
    @Ctx() { request }: AppContext
    ): number {
    return (request.session.userId === this.userId) ? this.balance : 0;
  }
}
