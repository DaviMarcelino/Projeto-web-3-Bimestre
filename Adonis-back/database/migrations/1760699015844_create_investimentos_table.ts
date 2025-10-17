import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Investimentos extends BaseSchema {
  protected tableName = 'investimentos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('tipo')
      table.decimal('valor', 12, 2)
      table.integer('conta_id').unsigned().references('id').inTable('contas').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
