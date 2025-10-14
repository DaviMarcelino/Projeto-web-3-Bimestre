import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Conta from './conta.js'

export default class Investimento extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare conta_id: number

  @column()
  declare tipo: 'poupanca' | 'titulo_governo' | 'acoes'

  @column()
  declare valor: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime()
  declare updatedAt: DateTime | null

  @belongsTo(() => Conta, { foreignKey: 'conta_id' })
  declare conta: BelongsTo<typeof Conta>
}
