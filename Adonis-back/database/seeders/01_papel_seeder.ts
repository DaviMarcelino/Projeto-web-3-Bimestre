import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Papel from '#models/papel'

export default class extends BaseSeeder {
  public async run () {
    await Papel.createMany([
      { nome: 'admin' },
      { nome: 'cliente' },
    ])
  }
}
