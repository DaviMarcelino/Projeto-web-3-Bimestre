import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Investimentos extends BaseSchema {
  protected tableName = 'investimentos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table
        .integer('conta_id')
        .unsigned()
        .references('id')
        .inTable('contas')
        .onDelete('CASCADE')

      table.enum('tipo', ['poupanca', 'titulo_governo', 'acoes']).notNullable()
      table.decimal('valor', 15, 2).notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('resgatado_em', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
