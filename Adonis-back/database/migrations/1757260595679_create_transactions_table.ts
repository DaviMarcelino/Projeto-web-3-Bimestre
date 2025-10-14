import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Transacoes extends BaseSchema {
  protected tableName = 'transacoes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table
        .integer('conta_id')
        .unsigned()
        .references('id')
        .inTable('contas')
        .onDelete('CASCADE')

      table.enum('tipo', ['deposito', 'saque', 'transferencia', 'aplicacao acoes', 'aplicacao poupanca', 'aplicacao titulos', 'resgate acoes', 'resgate poupanca', 'resgate titulos']).notNullable()
      table.decimal('valor', 15, 2).notNullable()
      table.string('descricao').nullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
