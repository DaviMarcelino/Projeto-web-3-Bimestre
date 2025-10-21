import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { OrbitProgress } from 'react-loading-indicators';
import { Client, setToken } from '../../api/client';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Title,
  InputTop,
  InputBottom,
  MsgBox,
  SendBox,
  Submit,
  CreateButton,
  Orbit,
} from './style';

export default function FormSignin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [load, setLoad] = useState(false);
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { user: prevUser } = location.state || {};

  function Authenticate() {
    const user = {
      nome: name,
      email: email,
      senha: password,
    };
    console.log(user);

    if (!user) {
      console.log(user);
      return <p>Nenhum dado recebido </p>;
    }
    setView(false);

    if (!name || !email || !password) {
      setView(1);
    } else if (password.length < 6) {
      setView(2);
    } else if (email.length < 7) {
      setView(3);
    } else {
      setLoad(true);
      setTimeout(() => {
        Client.post('users', user)
          .then(() => navigate('/login'))
          .catch((error) => {
            setView(4);
            console.error(error);
          })
          .finally(() => setLoad(false));
      }, 1000);
    }
  }

  return (
    <Container>
      <Title>Estamos </Title>
      <Title>quase lá</Title>

      {load ? (
        <Orbit>
          <OrbitProgress
            variant="spokes"
            color="#0300d0ff"
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
          <InputTop
            id="name"
            name="name"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputTop
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputBottom
            id="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small>(min. 3 letras e 3 numeros)</small>
          <hr></hr>

          {view === 1 && (
            <MsgBox>
              <p>Complete os dados</p>
            </MsgBox>
          )}
          {view === 2 && (
            <MsgBox>
              <p>Crie uma senha mais forte</p>
            </MsgBox>
          )}
          {view === 3 && (
            <MsgBox>
              <p>Email inválido</p>
            </MsgBox>
          )}
          {view === 4 && (
            <MsgBox>
              <p>Erro</p>
            </MsgBox>
          )}

          <SendBox>
            <Submit value="Próximo" onClick={() => navigate('/login')} />
            <CreateButton onClick={() => navigate('/create')}>
              Anterior
            </CreateButton>
          </SendBox>
        </>
      )}
    </Container>
  );
}
