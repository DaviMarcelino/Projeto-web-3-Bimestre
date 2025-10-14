import axios from 'axios';

const Client = axios.create({ 
    baseURL: 'http://localhost:3333',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 segundos
})

// Função para obter o token do localStorage
const getToken = () => {
  return localStorage.getItem('access_token')
}

// Função para salvar o token no localStorage
const setToken = (token) => {
  if (token) {
    localStorage.setItem('access_token', token)
    console.log('Token salvo:', token.substring(0, 20) + '...')
  }
}

// Função para remover o token do localStorage
const removeToken = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user_data')
  localStorage.removeItem('permissions')
}

// Interceptador de requisição para adicionar o token automaticamente
Client.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log(`🔄 Adicionando token à requisição: ${config.url}`)
    } else {
      console.log(`🔄 Requisição sem token: ${config.url}`)
    }
    return config;
  },
  (error) => {
    console.error('❌ Erro no interceptor de requisição:', error)
    return Promise.reject(error);
  }
)

// Interceptador de resposta para tratar erros de autenticação
Client.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`)
    return response
  },
  (error) => {
    const method = error.config?.method?.toUpperCase() || 'UNKNOWN'
    const url = error.config?.url || 'unknown'
    const status = error.response?.status || 'No Response'
    
    console.error(`❌ ${method} ${url} - ${status}`, error.response?.data)

    // Log mais detalhado para debugging
    if (error.response) {
      console.error('Detalhes do erro:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      })
    }

    /*if (error.response?.status === 401) {
      console.warn('Token inválido ou expirado. Redirecionando para login...')
      removeToken()
      
      // Evitar redirecionamento em loop
      if (!window.location.pathname.includes('/login')) {
        setTimeout(() => {
          window.location.href = '/login'
        }, 1000)
      }
    }*/

    return Promise.reject(error)
  }
);

// Função melhorada para testar conexão
export const testConnection = async () => {
  try {
    const response = await Client.get('/health')
    console.log('✅ Backend conectado:', response.data)
    return true
  } catch (error) {
    console.error('❌ Backend offline:', error.message)
    return false
  }
};

export { Client, getToken, setToken, removeToken }