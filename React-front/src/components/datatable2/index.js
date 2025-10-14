import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { OrbitProgress } from 'react-loading-indicators';
import IconPig from '../../images/pig.png';
import IconBank from '../../images/bank.png';
import UserContext from '../../contexts/UserContext';
import { Client, setToken } from '../../api/client';
import { setPermissions } from '../../service/PermissionService';
import { setDataUser } from '../../service/UserService';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saldo, setSaldo] = useState(null);
  const [load, setLoad] = useState(true);
  const [viewButton, setViewButton] = useState(false);
  const [viewContainer, setViewContainer] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // Função para mostrar/ocultar extrato
  function ShowContainer() {
    setViewContainer(!viewContainer);
  }

  // Função para mostrar/ocultar o saldo
  function ShowButton() {
    setViewButton(!viewButton);
  }

  // Função para autenticar usuário
  function Authenticate() {
    const user = { email: email, password: password };
    setViewButton(false);
    setLoad(true);

    setTimeout(() => {
      Client.post('auth/login', user)
        .then((res) => {
          const data = res.data;
          console.log('Login bem-sucedido:', data);
          setUser(data.user);
          setDataUser(data.user);
          setToken(data.token.value);
          setPermissions(data.permissions);
          navigate('/home');
        })
        .catch(function (error) {
          setViewButton(true);
          console.log('Erro no login:', error);
        })
        .finally(() => {
          setLoad(false);
        });
    }, 1000);
  }

  // Função para buscar saldo real do usuário
  function getSaldoReal() {
    Client.get('/conta/saldo')
      .then((res) => {
        console.log('Saldo real:', res.data.saldo);
        setSaldo(res.data.saldo);
      })
      .catch((error) => {
        console.error('Erro ao buscar saldo:', error);
      });
  }

  // Faz login automático (ou você pode remover isso se quiser)
  useEffect(() => {
    Authenticate();
  }, []);

  // Quando terminar o carregamento do login, busca o saldo
  useEffect(() => {
    if (!load) {
      getSaldoReal();
    }
  }, [load]);

  // Renderização
  return load ? (
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
  ) : (
    <>
      <Container>
        {viewContainer ? (
          <>
            <Title>Saldo</Title>
            <ContainerLine>
              <Button2 onClick={ShowButton}>𖠂</Button2>
              {viewButton ? (
                <SubTitle>R$ --.--</SubTitle>
              ) : (
                <SubTitle>
                  {saldo !== null
                    ? `R$ ${saldo.toFixed(2).replace('.', ',')}`
                    : 'Carregando...'}
                </SubTitle>
              )}
            </ContainerLine>

            <Button onClick={ShowContainer}>Consultar extrato</Button>
          </>
        ) : (
          <>
            <Container2></Container2>
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
          <Button3>
            <img src={IconBank} alt="Aplicações" />
            <span>Aplicações</span>
          </Button3>
        </ContainerLine>
        
      </Container>
    </>
  );
}
