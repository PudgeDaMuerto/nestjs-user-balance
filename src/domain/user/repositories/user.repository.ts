import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import Decimal from 'decimal.js';

@Injectable()
export class UserRepository {
  constructor() {}

  async getUserForUpdate(
    userId: number,
    manager: EntityManager,
  ): Promise<UserEntity | null> {
    return manager.getRepository(UserEntity).findOne({
      where: { id: userId },

      lock: { mode: 'pessimistic_write' },
    });
  }

  async updateBalance(
    userId: number,
    balance: Decimal,
    manager: EntityManager,
  ): Promise<void> {
    const newBalance = balance.toFixed(2);

    await manager
      .getRepository(UserEntity)
      .update({ id: userId }, { balance: newBalance });
  }
}
