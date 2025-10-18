import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Contas extends BaseSchema {
  protected tableName = 'contas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('agencia').notNullable()
      table.string('numero').notNullable().unique()
      table.decimal('saldo', 12, 2).defaultTo(0)
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}