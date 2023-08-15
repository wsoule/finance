import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class TransactionType extends BaseEntity {
  /** Identity of transaction type. */
  @PrimaryGeneratedColumn('increment')
  @Field()
  id!: number;

  /** Type of transaction. */
  @Column()
  @Field()
  transactionType!: string;
}
