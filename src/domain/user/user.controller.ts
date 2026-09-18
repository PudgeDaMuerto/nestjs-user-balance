import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { BalanceOperationDto } from './dto/balance-operation.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':userId/debit')
  debit(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: BalanceOperationDto,
  ) {
    console.log(`incoming debit with body: ${JSON.stringify(body)}`);
    return this.userService.debit(userId, body);
  }

  @Post(':userId/credit')
  credit(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: BalanceOperationDto,
  ) {
    console.log(`incoming credit with body: ${JSON.stringify(body)}`);
    return this.userService.credit(userId, body);
  }
}
