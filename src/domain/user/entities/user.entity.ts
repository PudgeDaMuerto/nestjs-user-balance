import { Check, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm/browser';
import { BalanceHistoryEntity } from './balance-history.entity';

@Check('"balance" >= 0.0')
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0.0,
  })
  balance: string;

  @OneToMany(
    () => BalanceHistoryEntity,
    (balanceHistory) => balanceHistory.user,
  )
  balanceHistoryRecords: BalanceHistoryEntity[];
}
