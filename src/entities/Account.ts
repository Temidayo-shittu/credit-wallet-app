// src/entities/Account.ts

import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Wallet } from './Wallet';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accName: string;

  @Column()
  bankAccount: string;

  @Column()
  accBalance: number;

  @OneToOne(type => User, user => user.account)
  @JoinColumn()
  user: User;

  @OneToMany(type => Wallet, wallet => wallet.account, { cascade: true })
  wallets: Wallet[];
}
