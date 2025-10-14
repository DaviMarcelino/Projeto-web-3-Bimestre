import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Investimento from '#models/investimento'

export default class InvestimentosSeeder extends BaseSeeder {
  public async run () {
    await Investimento.createMany([
      { conta_id: 1, tipo: 'poupanca', valor: 500.00 },
      { conta_id: 2, tipo: 'acoes', valor: 200.00 },
    ])
  }
}
