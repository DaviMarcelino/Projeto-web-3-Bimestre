import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Conta from '#models/conta'

export default class ContasSeeder extends BaseSeeder {
  public async run () {
    await Conta.createMany([
      { user_id: 1, agencia: '0001', numero: '12345-6', saldo: 1500.00 },
      { user_id: 2, agencia: '0001', numero: '54321-0', saldo: 300.00 },
    ])
  }
}
