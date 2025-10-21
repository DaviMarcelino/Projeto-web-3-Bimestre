import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Corrigido import
import { OrbitProgress } from 'react-loading-indicators';
import IconBank from '../../images/bank.png';
import UserContext from '../../contexts/UserContext';
import { Client } from '../../api/client'; // Removido setToken não utilizado
import {
  Container,
  Title,
  SubTitle,
  Button,
  Button2,
  Button3,
  Button4,
  ContainerLine,
  Container2,
  Orbit,
} from './style';

export default function DataTable() {
  const [saldo, setSaldo] = useState(null);
  const [load, setLoad] = useState(true);
  const [viewButton, setViewButton] = useState(false);
  const [viewContainer, setViewContainer] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Use user para verificar autenticação

  // Função para mostrar/ocultar extrato
  function ShowContainer() {
    setViewContainer(!viewContainer);
  }

  // Função para mostrar/ocultar o saldo
  function ShowButton() {
    setViewButton(!viewButton);
  }

  // Função para buscar saldo real do usuário
  function getSaldoReal() {
    Client.get('/conta/saldo')
      .then((res) => {
        console.log('Saldo real:', res.data);
        setSaldo(res.data.saldo || res.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar saldo:', error);
        setSaldo(0);
      })
      .finally(() => {
        setLoad(false);
      });
  }

  // Verificar autenticação e buscar saldo
  useEffect(() => {
    // Verifica se o usuário está autenticado
    if (!user) {
      console.log('Usuário não autenticado, redirecionando para login...');
      navigate('/login');
      return;
    }
    
    // Se estiver autenticado, busca o saldo
    console.log('Usuário autenticado, buscando saldo...');
    getSaldoReal();
  }, [user, navigate]);

  // Renderização do loading
  if (load) {
    return (
      <Orbit>
        <OrbitProgress
          variant="spokes"
          color="#cf5387"
          size="small"
          text=""
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          }}
        />
      </Orbit>
    );
  }

  return (
    <>
      <Container>
        {viewContainer ? (
          <>
            <Title>Saldo</Title>
            <ContainerLine>
              <Button2 onClick={ShowButton}>👁️</Button2>
              {viewButton ? (
                <SubTitle>R$ --.--</SubTitle>
              ) : (
                <SubTitle>
                  {saldo !== null
                    ? `R$ ${typeof saldo === 'number' ? saldo.toFixed(2).replace('.', ',') : '0,00'}`
                    : 'Carregando...'}
                </SubTitle>
              )}
            </ContainerLine>

            <Button onClick={ShowContainer}>Consultar extrato</Button>
          </>
        ) : (
          <>
            <Container2>
              <Title>Extrato</Title>
              <p>Funcionalidade em desenvolvimento...</p>
            </Container2>
            <Button onClick={ShowContainer}>Ocultar extrato</Button>
          </>
        )}
      </Container>

      <Container>
        <ContainerLine>
          <Button4 onClick={() => navigate('/payment')}>
            ❖<span>Pix</span>
          </Button4>
          <Button3 style={{ visibility: 'hidden' }} />
          <Button3 onClick={() => navigate('/investments')}>
            <img src={IconBank} alt="Aplicações" />
            <span>Aplicações</span>
          </Button3>
        </ContainerLine>
      </Container>
    </>
  );
}