import { Knex } from "knex";
import db from '../connection';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await db("users").del();

    // Inserts seed entries
    await db("users").insert([
        { fullname: 'John Doe', email: 'john@example.com', password: 'hashedPassword1' },
        { fullname: 'Jane Doe', email: 'jane@example.com', password: 'hashedPassword2' },
    ]);
};
