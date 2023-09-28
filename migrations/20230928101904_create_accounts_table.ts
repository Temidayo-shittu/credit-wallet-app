// File: migrations/20230924000000_create_accounts_table.ts

import { Knex } from 'knex';
import db from '../src/db/connection';

export async function up(knex: Knex): Promise<void> {
  await db.schema.createTable('accounts', (table) => {
    table.increments('id').primary();
    table.string('accName').notNullable();
    table.string('bankAccount').unique().notNullable();
    table.integer('accBalance').unique().notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await db.schema.dropTableIfExists('accounts');
}




