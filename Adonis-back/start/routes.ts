import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import TransacaoController from '#controllers/transacoes_controller'
import ContasController from '#controllers/contas_controller'

router.get('/health', async () => {
  return { status: 'ok', message: 'Backend funcionando' }
})

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Rotas de autenticação (públicas)
router.group(() => {
  router.post('/register', '#controllers/auth_controller.register')
  router.post('/login', '#controllers/auth_controller.login')
  // Rotas protegidas de autenticação
  router.post('/logout', '#controllers/auth_controller.logout').use(middleware.auth())
  router.get('/me', '#controllers/auth_controller.me').use(middleware.auth())
}).prefix('/auth')

// Rotas protegidas do sistema bancário
router.group(() => {
  // Users
  router.resource('users', '#controllers/users_controller')

  // Contas
  router.get('/conta/saldo', [ContasController, 'showSaldo'])

  // Transações
  router.get('/transacao/conta/:chave', [TransacaoController, 'buscarConta'])
  router.post('/transacao', [TransacaoController, 'transferir'])


  // Investimentos

}).use(middleware.auth())

// Rota pública boas-vindas
router.get('/hello', async () => {
  return {
    message: 'BANIF - API Bancária',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login',
        logout: 'POST /auth/logout (protegida)',
        me: 'GET /auth/me (protegida)',
      },
      banking: {
        users: 'CRUD /users (protegida)',
        contas: 'CRUD /contas (protegida)',
        transacoes: 'CRUD /transacoes (protegida)',
        investimentos: 'CRUD /investimentos (protegida)',
        saldo: 'GET /contas/:id/saldo (protegida)',
        extrato: 'GET /contas/:id/extrato (protegida)',
        pix: 'POST /transacoes/pix (protegida)',
      },
    },
  }
})