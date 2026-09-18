import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { BalanceOperationDto } from './dto/balance-operation.dto';
import { BalanceHistoryRepository } from './repositories/balance-history.repository';
import {
  BalanceAction,
  BalanceHistoryEntity,
} from './entities/balance-history.entity';
import Decimal from 'decimal.js';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly balanceHistoryRepository: BalanceHistoryRepository,
    private readonly dataSource: DataSource,
  ) {}

  async debit(
    userId: number,
    body: BalanceOperationDto,
  ): Promise<BalanceHistoryEntity> {
    return this.makeBalanceOperation(userId, body, BalanceAction.DEBIT);
  }

  async credit(
    userId: number,
    body: BalanceOperationDto,
  ): Promise<BalanceHistoryEntity> {
    return this.makeBalanceOperation(userId, body, BalanceAction.CREDIT);
  }

  private async makeBalanceOperation(
    userId: number,
    body: BalanceOperationDto,
    action: BalanceAction,
  ): Promise<BalanceHistoryEntity> {
    const amount = new Decimal(body.amount);

    return this.dataSource.transaction(async (manager) => {
      const user = await this.userRepository.getUserForUpdate(userId, manager);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const balance = new Decimal(user.balance);
      if (action === BalanceAction.CREDIT && balance.lessThan(amount)) {
        throw new BadRequestException(`User don't have enough money`);
      }

      const newRecord = await this.balanceHistoryRepository.addRecord(manager, {
        userId,
        action,
        amount,
      });

      const newBalance = await this.balanceHistoryRepository.calculateBalance(
        manager,
        userId,
      );

      await this.userRepository.updateBalance(userId, newBalance, manager);

      return newRecord;
    });
  }
}
