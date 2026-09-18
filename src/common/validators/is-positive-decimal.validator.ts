import {
  isDecimal,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import Decimal from 'decimal.js';

export function IsPositiveDecimal(
  options: validator.IsDecimalOptions,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPositiveDecimal',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          if (typeof value !== 'string') {
            return false;
          }

          if (!isDecimal(value, options)) {
            return false;
          }

          try {
            return new Decimal(value).gt(0);
          } catch {
            return false;
          }
        },

        defaultMessage() {
          return 'amount must be a positive decimal number';
        },
      },
    });
  };
}
