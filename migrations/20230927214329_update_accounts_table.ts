// File: migrations/20230924000000_create_accounts_table.ts

import { Knex } from 'knex';
import db from '../src/db/connection';

export async function up(knex: Knex): Promise<void> {
  await db.schema.createTable('accounts', (table) => {
    table.increments('id').primary();
    table.string('accName').notNullable();
    table.string('bankAccount').unique().notNullable();
    table.integer('accBalance').notNullable().defaultTo(0);
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await db.schema.dropTableIfExists('accounts');
}


