import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { RecurringTransaction } from '@modules/transactions/entities/recurring-transaction.entity';
import { Transaction } from '@modules/transactions/entities/transaction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];

  @OneToMany(
    () => RecurringTransaction,
    recurringTransaction => recurringTransaction.user,
  )
  recurringTransactions: RecurringTransaction[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
