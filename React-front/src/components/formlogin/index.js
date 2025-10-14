import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { OrbitProgress } from 'react-loading-indicators';
import UserContext from '../../contexts/UserContext';
import { Client, setToken, testConnection } from '../../api/client';
import { setPermissions } from '../../service/PermissionService';
import { setDataUser } from '../../service/UserService';
import {
  Container,
  Title,
  Label,
  InputPassword,
  InputEmail,
  MsgBox,
  SendBox,
  Submit,
  LinkForgot,
  CreateButton,
  Orbit,
} from './style';

export default function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState(false);
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    testConnection();
  }, []);


  // TESTE
  function Authenticate() {

    const user = { email: email, password: password }

    setView(false)
    setLoad(true)
    setTimeout(() => {
      Client.post('/auth/login', user).then(res => {
        const load = res.data
        console.log(load)
        // Context
        setUser(load.user)
        // Local Storage
        setDataUser(load.user)
        setToken(load.token.value)
        setPermissions(load.permissions)
        navigate('/home')
      })
        .catch(function (error) {
          setView(true)
          console.log(error)
        })
        .finally(() => {
          setLoad(false)
        })

    }, 1000)
  }


  return (
    <Container>
      <Title>Hello world!</Title>
      {load ? (
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
          <Label>E-mail</Label>
          <InputEmail
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Label>Senha</Label>
          <InputPassword
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {
            view
              ?
              <MsgBox>
                <p>Usuário e Senha Inválidos!</p>
              </MsgBox>
              :
              ''
          }

          <SendBox>
            <Submit value="Autenticar" onClick={() => Authenticate()} />
            <LinkForgot onClick={() => navigate('/login')}> Esqueceu sua senha?</LinkForgot>
          </SendBox>
        </>

      )}
    </Container>
  );
}
