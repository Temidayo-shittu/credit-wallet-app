// src/entities/Wallet.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from './Account';

export enum WalletTypes {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
}

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: WalletTypes,
    default: WalletTypes.DEPOSIT, // Default to DEPOSIT type
  })
  type: WalletTypes;

  @ManyToOne(type => Account, account => account.wallets)
  account: Account;
}
