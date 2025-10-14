import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from './user.js'
import Transacao from './transacao.js'
import Aplicacao from './investimento.js'

export default class Conta extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare agencia: string

  @column()
  declare numero: string

  @column()
  declare saldo: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => User, { foreignKey: 'user_id' })
  declare user: BelongsTo<typeof User>

  @hasMany(() => Transacao, { foreignKey: 'conta_id' })
  declare transacoes: HasMany<typeof Transacao>

  @hasMany(() => Aplicacao, { foreignKey: 'conta_id' })
  declare aplicacoes: HasMany<typeof Aplicacao>
}
