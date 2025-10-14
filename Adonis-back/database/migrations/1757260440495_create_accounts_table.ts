import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Contas extends BaseSchema {
  protected tableName = 'contas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.string('agencia').notNullable()
      table.string('numero').notNullable().unique()
      table.decimal('saldo', 15, 2).notNullable().defaultTo(0)

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
