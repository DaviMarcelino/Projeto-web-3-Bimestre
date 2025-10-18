import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Transacoes extends BaseSchema {
  protected tableName = 'transacoes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('tipo').notNullable()
      table.decimal('valor', 12, 2).notNullable()
      table.string('descricao').notNullable()
      table.integer('conta_id').unsigned().notNullable() // APENAS a coluna, SEM foreign key
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}