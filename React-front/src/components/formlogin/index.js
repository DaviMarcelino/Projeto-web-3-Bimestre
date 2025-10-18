import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Corrigido import
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
  Orbit,
} from './style'; // Removido CreateButton não utilizado

export default function FormLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(''); // Substitui 'view' por 'error'
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    testConnection();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e?.preventDefault(); // Previne default se for evento
    
    // Validação básica
    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setError('');
    setLoad(true);

    try {
      const response = await Client.post('/auth/login', formData);
      const data = response.data;
      
      // Context
      setUser(data.user);
      // Local Storage
      setDataUser(data.user);
      setToken(data.token.value);
      setPermissions(data.permissions);
      navigate('/home');
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Usuário e Senha Inválidos!');
    } finally {
      setLoad(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

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
          <Label htmlFor="email">E-mail</Label>
          <InputEmail
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={load}
          />

          <Label htmlFor="password">Senha</Label>
          <InputPassword
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={load}
          />

          {error && (
            <MsgBox>
              <p>{error}</p>
            </MsgBox>
          )}

          <SendBox>
            <Submit 
              type="button" 
              value="Autenticar" 
              onClick={handleSubmit}
              disabled={load}
            />
            <LinkForgot onClick={() => navigate('/forgot-password')}>
              Esqueceu sua senha?
            </LinkForgot>
          </SendBox>
        </>
      )}
    </Container>
  );
}