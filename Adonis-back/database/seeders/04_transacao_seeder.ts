import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Transacao from '#models/transacao'

export default class TransacoesSeeder extends BaseSeeder {
  public async run () {
    await Transacao.createMany([
      { conta_id: 2, tipo: 'deposito', valor: 500.00, descricao: 'Depósito inicial' },
      { conta_id: 2, tipo: 'aplicacao acoes', valor: 200.00, descricao: 'Aplicação em ações' },
      { conta_id: 1, tipo: 'deposito', valor: 2000.00, descricao: 'Depósito inicial' },
      { conta_id: 1, tipo: 'aplicacao poupanca', valor: 500.00, descricao: 'Aplicação na poupança' },
    ])
  }
}
