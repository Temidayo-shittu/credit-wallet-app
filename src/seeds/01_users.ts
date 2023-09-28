import { Knex } from "knex";
import db from '../db/connection';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
  await db('users').del();

  // Inserts seed entries
  await db('users').insert([
    { fullname: 'john_doe', email:'johndoe@gamil.com', password: 'hashed_password_1' },
    { fullname: 'jane_doe', email:'janedoe@gamil.com', password: 'hashed_password_2' },
    // Add more users as needed
  ]);
};
