import { IsNotEmpty } from 'class-validator';
import { IsPositiveDecimal } from '../../../common/validators/is-positive-decimal.validator';

export class BalanceOperationDto {
  @IsNotEmpty()
  @IsPositiveDecimal({ decimal_digits: '2', force_decimal: true })
  amount: string;
}
