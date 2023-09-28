import { Knex } from "knex";
import db from '../src/db/connection';


export async function up(knex: Knex): Promise<void> {
    await db.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('fullname').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    await db.schema.dropTableIfExists('users');
}

