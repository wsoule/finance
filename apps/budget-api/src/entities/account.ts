import { Ctx, Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  ColumnOptions,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { User } from './user';
import { AppContext } from '../types';
import { WithPrecisionColumnType } from 'typeorm/driver/types/ColumnTypes';
import { ColumnNumericOptions } from 'typeorm/decorator/options/ColumnNumericOptions';

export interface moneyColumnSettings {
  type: WithPrecisionColumnType;
  options: (ColumnOptions & ColumnNumericOptions);
}

export const moneyColumnProps: moneyColumnSettings = {
  type: 'decimal',
  options: {
    precision: 20,
    scale: 2
  }
};


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
  userId!: string;

  /** Balance of a user's account. */
  @Column(moneyColumnProps)
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
    return (request.session.userId === this.userId) ? this.balance : 0;
  }
}
