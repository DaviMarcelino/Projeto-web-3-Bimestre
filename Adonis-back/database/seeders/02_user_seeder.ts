import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'

export default class UsersSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        fullName: 'Mateus Munhoz',
        email: 'mateus@gmail.com',
        password: await Hash.make('123456'),
        cpf: '12345678901',
        cidade: 'Pontal do Paraná',
        estado: 'PR',
        rua: 'Rua A',
        numero: '100',
        papel_id: 2,
      },
      {
        fullName: 'Leonardo Henz',
        email: 'leonardo@gmail.com',
        password: await Hash.make('123456'),
        cpf: '98765432100',
        cidade: 'Matinhos',
        estado: 'PR',
        rua: 'Rua B',
        numero: '200',
        papel_id: 2,
      },
    ])
  }
}
