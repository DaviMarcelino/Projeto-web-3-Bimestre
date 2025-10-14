import Conta from '#models/conta'
import Transacao from '#models/transacao'
import User from '#models/user'

export default class TransacaoController {
    async buscarConta({ params, response }) {
        const chave = params.chave

        let userQuery = User.query()

        if (/^\d{11}$/.test(chave)) {
            // CPF (apenas números)
            userQuery = userQuery.where('cpf', chave)
        } else if (chave.includes('@')) {
            // e-mail
            userQuery = userQuery.where('email', chave)
        } else if (!isNaN(chave)) {
            // ID numérico
            const conta = await Conta.find(chave)
            if (conta) return conta
        }

        const user = await userQuery.preload('conta').first()

        if (!user || !user.conta) {
            return response.notFound({ message: 'Conta não encontrada' })
        }

        return user.conta
    }

    async transferir({ request, response }) {
        const { remetenteId, destinatarioId, valor } = request.only([
            'remetenteId',
            'destinatarioId',
            'valor',
        ])

        // Busca contas
        const remetente = await Conta.query().where('user_id', remetenteId).first()
        const destinatario = await Conta.query().where('user_id', destinatarioId).first()

        if (!remetente || !destinatario) {
            return response.notFound({ message: 'Conta inválida' })
        }

        if (remetente.saldo < valor) {
            return response.badRequest({ message: 'Saldo insuficiente' })
        }

        if (remetente.id === destinatario.id) {
            return response.badRequest({ message: 'Não é possível transferir para a mesma conta' })
        }

        
        remetente.saldo = Number(remetente.saldo) - valor
        destinatario.saldo = Number(destinatario.saldo) + valor

        //arrumar o destinatario saldo

        await remetente.save()
        await destinatario.save()

        await Transacao.create({
            conta_id: remetente.id,
            tipo: 'transferencia',
            valor: -valor,
            descricao: `Transferência para conta ${destinatario.numero}`,
        })

        await Transacao.create({
            conta_id: destinatario.id,
            tipo: 'transferencia',
            valor: valor,
            descricao: `Transferência recebida da conta ${remetente.numero}`,
        })

        return response.ok({
            message: 'Transferência concluída com sucesso de ' + remetenteId + ' ' + remetente.saldo + ' para ' + destinatarioId + ' ' + destinatario.saldo,
            remetente,
            destinatario,
        })
    }
}
