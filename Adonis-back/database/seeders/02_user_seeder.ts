import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UsersSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        fullName: 'Vitor',
        email: 'Vitorflorencio@gmail.com',
        password: ('123456'),
        cpf: '12345678901',
        cidade: 'balneario gaivotas',
        estado: 'PR',
        rua: 'Rua A',
        numero: '100',
        papel_id: 2,
      },
      {
        fullName: 'Davi',
        email: 'davilindo@gmail.com',
        password: ('123456'),
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
