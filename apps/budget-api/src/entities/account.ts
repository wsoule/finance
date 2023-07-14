import { Ctx, Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @PrimaryGeneratedColumn('increment')
  accountNumber!: number;
  
  /** ID of the entity. */
  @Column()
  @OneToOne(() => User)
  @JoinColumn({ name: 'id'})
  @Field()
  id!: string;

  /** balance of a user's account. */
  @Column()
  balance!: number;

  /** date when the account is created. */
  @CreateDateColumn()
  @Field(() => String)
  createdAt!: Date;

  /** date when account was last updated. */
  @UpdateDateColumn()
  @Field(() => String)
  updatedAt!: Date;

  /** gets the users balance if they have the correct ID. */
  @Field(() => Number, { name: 'id', nullable: true })
  balanceField(
    @Ctx() { request }: AppContext
    ): number | null {
    return (request.session.userId === this.id) ? this.balance : null;
  }
}
