import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/browser';
import { UserEntity } from './user.entity';

export enum BalanceAction {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

@Check('"amount" >= 0.0')
@Entity('balance_history')
export class BalanceHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.balanceHistoryRecords)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: BalanceAction,
  })
  action: BalanceAction;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  amount: string;

  @CreateDateColumn()
  ts: Date;
}
