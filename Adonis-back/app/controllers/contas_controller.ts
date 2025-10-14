import Conta from '#models/conta'

export default class ContasController {
    async showSaldo({ auth, response }) {
        const user = await auth.authenticate()
        const conta = await Conta.query().where('user_id', user.id).first()

        if (!conta) {
            return response.notFound({ message: 'Conta não encontrada' })
        }

        return {
            saldo: Number(conta.saldo),
        }
    }
}
