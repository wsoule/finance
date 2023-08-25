import { Ctx, Field, ObjectType } from 'type-graphql';
import {
  BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import { User } from './user';
import { AppContext } from '../types';
import { MoneyColumnType } from '@finance/node';

@Entity()
@ObjectType()
export class Account extends BaseEntity {

  /** Account Number for the user. */
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id!: string;

  /** ID of the entity. */
  @Column()
  @OneToOne(() => User)
  @Field()
  userID!: string;

  /** Balance of a user's account. */
  @Column(MoneyColumnType)
  balance!: number;

  /** Date when the account is created. */
  @CreateDateColumn()
  @Field(() => Number)
  createdAt!: Date;

  /** Date when account was last updated. */
  @UpdateDateColumn()
  @Field(() => Number)
  updatedAt!: Date;

  /** Gets the users balance if they are currently logged in. */
  @Field(() => Number, { name: 'balance' })
  balanceField(
    @Ctx() { request }: AppContext
  ): number {
    return (request.session.userID === this.userID) ? this.balance : 0;
  }
}
