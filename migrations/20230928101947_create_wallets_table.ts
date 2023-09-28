import { Knex } from "knex";
import db from '../src/db/connection';


export async function up(knex: Knex): Promise<void> {
  return db.schema.createTable('wallets', (table) => {
    table.increments('id').primary();
    table.integer('amount').notNullable();
    table.enum('transactionType', ['deposit', 'withdrawal']).notNullable(); // Use enum for specific values
    table.integer('senderAccountId').unsigned().notNullable();
    table.integer('receiverAccountId').unsigned().notNullable();
    table.foreign('senderAccountId').references('accounts.id');
    table.foreign('receiverAccountId').references('accounts.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return db.schema.dropTable('wallets');
}




