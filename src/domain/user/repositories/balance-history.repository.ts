import { Injectable } from '@nestjs/common';
import {
  BalanceAction,
  BalanceHistoryEntity,
} from '../entities/balance-history.entity';
import Decimal from 'decimal.js';
import { EntityManager } from 'typeorm';

export interface AddRecordOptions {
  userId: number;
  action: BalanceAction;
  amount: Decimal;
}

@Injectable()
export class BalanceHistoryRepository {
  constructor() {}

  async addRecord(
    manager: EntityManager,
    { userId, action, amount }: AddRecordOptions,
  ): Promise<BalanceHistoryEntity> {
    return manager.getRepository(BalanceHistoryEntity).save({
      userId,
      action,
      amount: amount.toFixed(2),
    });
  }

  async calculateBalance(
    manager: EntityManager,
    userId: number,
  ): Promise<Decimal> {
    const repository = manager.getRepository(BalanceHistoryEntity);
    const records = await repository.find({
      where: { userId },
      select: { action: true, amount: true },
    });

    return records.reduce<Decimal>(
      (prev, curr) =>
        curr.action === BalanceAction.DEBIT
          ? prev.add(curr.amount)
          : prev.minus(curr.amount),
      new Decimal(0),
    );
  }
}
