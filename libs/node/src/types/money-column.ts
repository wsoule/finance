import { ColumnOptions } from 'typeorm';
import { WithPrecisionColumnType } from 'typeorm/driver/types/ColumnTypes';
import { ColumnNumericOptions } from 'typeorm/decorator/options/ColumnNumericOptions';

export interface MoneyColumnTypeProps {
  type: WithPrecisionColumnType;
  options: (ColumnOptions & ColumnNumericOptions);
}

export const MoneyColumnType: MoneyColumnTypeProps = {
  type: 'decimal',
  options: {
    precision: 20,
    scale: 2
  }
} as const;
