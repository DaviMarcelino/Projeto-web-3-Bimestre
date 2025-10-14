export const permissions = {
  // Gerente (papel_id: 1)
  1: {
    // Users
    listUser: true,
    viewUser: true,
    createUser: true,
    updateUser: true,
    deleteUser: true,
    viewOwnProfile: true,
    updateOwnProfile: true,
    
    // Contas
    listConta: true,
    viewConta: true,
    createConta: true,
    updateConta: true,
    deleteConta: true,
    viewSaldo: true,
    viewExtrato: true,
    viewOwnConta: true,
    viewOwnSaldo: true,
    viewOwnExtrato: true,
    
    // Transações
    listTransacao: true,
    viewTransacao: true,
    createTransacao: true,
    transferencia: true,
    deposito: true,
    saque: true,
    pix: true,
    viewOwnTransacoes: true,
    extrato: true,
    
    // Investimentos
    listInvestimento: true,
    viewInvestimento: true,
    createInvestimento: true,
    resgatarInvestimento: true,
    aplicarInvestimento: true,
    deleteInvestimento: true,
    poupanca: true,
    tituloGoverno: true,
    acoes: true,
    viewOwnInvestimentos: true,
  },
  
  // Cliente (papel_id: 2)
  2: {
    // Users
    listUser: false,
    viewUser: false,
    createUser: false,
    updateUser: false,
    deleteUser: false,
    viewOwnProfile: true,
    updateOwnProfile: true,
    
    // Contas
    listConta: false,
    viewConta: false,
    createConta: false,
    updateConta: false,
    deleteConta: false,
    viewSaldo: false,
    viewExtrato: false,
    viewOwnConta: true,
    viewOwnSaldo: true,
    viewOwnExtrato: true,
    
    // Transações
    listTransacao: false,
    viewTransacao: false,
    createTransacao: true,
    transferencia: true,
    deposito: true,
    saque: true,
    pix: true,
    viewOwnTransacoes: true,
    extrato: true,
    
    // Investimentos
    listInvestimento: false,
    viewInvestimento: false,
    createInvestimento: true,
    resgatarInvestimento: true,
    aplicarInvestimento: true,
    deleteInvestimento: false,
    poupanca: true,
    tituloGoverno: true,
    acoes: true,
    viewOwnInvestimentos: true,
  }
}