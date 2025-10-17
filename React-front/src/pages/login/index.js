import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container } from './style';
import FormLogin from '../../components/formlogin';
import { Client } from '../../api/client';
import { OrbitProgress } from 'react-loading-indicators';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se usuário já está logado
    Client.get('/auth/me')
      .then(() => navigate('/home')) // Se logado, vai para home
      .catch(() => {}) // Se não logado, ignora erro
      .finally(() => setLoading(false)); // Para loading
  }, [navigate]);

  if (loading) {
    return (
      <Container>
        <OrbitProgress
          variant="spokes"
          color="#00b4a0" // Cor XP
          size="small"
          text="Verificando..."
        />
      </Container>
    );
  }

  return (
    <Container>
      <FormLogin />
    </Container>
  );
}