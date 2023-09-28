import { Knex } from "knex";
import db from '../connection';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await db("accounts").del();

    // Inserts seed entries
    await knex("accounts").insert([
        { accName: 'Savings Account', bankAccount: '1234567890', user_id: 1 },
        { accName: 'Checking Account', bankAccount: '0987654321', user_id: 2 },
    ]);
};
