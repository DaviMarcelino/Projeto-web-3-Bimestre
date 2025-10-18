import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddForeignKeyToInvestimentos extends BaseSchema {
  public async up() {
    this.schema.alterTable('investimentos', (table) => {
      table.foreign('conta_id').references('id').inTable('contas').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable('investimentos', (table) => {
      table.dropForeign(['conta_id'])
    })
  }
}