import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Account } from './account';
import { MoneyColumnType } from '@finance/node';
import { TransactionType } from './transaction-type';

@Entity()
@ObjectType()
export class Transaction extends BaseEntity {
  /** Transaction number. */
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id!: string;

  /** Transaction type id. */
  @Column()
  @OneToOne(() => TransactionType)
  @Field()
  transactionTypeID!: number;

  /** Account number to modify. */
  @Column()
  @OneToOne(() => Account)
  @Field()
  accountId!: string;

  /** Amount to add or subtract from @Account */
  @Column(MoneyColumnType)
  @Field()
  amount!: number;

  /** Date when transaction was created. */
  @CreateDateColumn()
  @Field(() => Number)
  createdAt!: Date;

  /** Date when transaction was last updated. */
  @UpdateDateColumn()
  @Field(() => Number)
  updatedAt!: Date;

  // /** Gets transactionAmount if the user has the account that is associated with transaction. */
  // @Field(() => Number, { name: 'transactionAmount' })
  // async transactionAmountField(
  //   @Ctx() { request, redis, response }: AppContext
  //   ): Promise<number> {
  //   const account = new AccountResolver();
  //   await account.accountDetails({ request, redis, response });
  // }
}
