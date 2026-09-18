import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { BalanceHistoryEntity } from './entities/balance-history.entity';
import { UserRepository } from './repositories/user.repository';
import { BalanceHistoryRepository } from './repositories/balance-history.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BalanceHistoryEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository, BalanceHistoryRepository],
})
export class UserModule {}
