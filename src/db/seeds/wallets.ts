import { Knex } from "knex";
import db from '../connection';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await db("wallets").del();

    // Inserts seed entries
    await db("wallets").insert([
        { amount: 1000, walletType: 'deposit', account_id: 1 },
        { amount: 500, walletType: 'withdrawal', account_id: 2 },
    ]);
};
