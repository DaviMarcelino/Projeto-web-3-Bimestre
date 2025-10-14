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
  Orbit,
  Button,
  Button4,
  ContainerLine,
  InputKey,
  InputValue,
  Container2,
} from './style';

export default function PaymentTable() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [load, setLoad] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [viewContainer, setViewContainer] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function ShowContainer() {
    setViewContainer(prev => !prev);
  }

  function buscarConta() {
    setLoad(true)
    Client.get(`/transacao/conta/${key}`)
      .then((response) => {
        const conta = response.data
        console.log('Conta encontrada:', conta)
        setViewData(true)
      })
      .catch((error) => {
        alert('Conta não encontrada!')
        console.error(error)
      })
      .finally(() => setLoad(false))
  }


  async function transferir() {
    setLoad(true)
    try {
      const remetenteId = user.id
      const valorNumerico = parseFloat(value.replace(',', '.'))

      const response = await Client.post('/transacao', {
        remetenteId,
        destinatarioId: key,
        valor: valorNumerico,
      })

      alert(response.data.message)
      navigate('/home')
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || 'Erro na transferência')
    } finally {
      setLoad(false)
    }
  }


  useEffect(() => {
    setViewData(true);
  }, [key]);

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
      {viewContainer ? (
        <>
          <Container>
            <Title>Transferir</Title>
            <InputKey
              placeholder="Chave Pix(CPF ou Email)"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <Button onClick={() => { ShowContainer(); buscarConta(); }}>Confirmar</Button>
            {viewData ? (
              <Container2>
                <Title>GAY</Title>
              </Container2>
            ) : (
              <Button4 style={{ visibility: 'hidden' }} />
            )}
          </Container>
          <Container>
            <ContainerLine>
              <Button4 style={{ visibility: 'hidden' }} />
              <Button4 onClick={() => navigate('/home')}>
                <span>Voltar</span>
              </Button4>
            </ContainerLine>
          </Container>
        </>
      ) : (
        <>
          <Container>
            <Title>Informe o valor</Title>
            <InputValue
              type="text"
              value={'R$ ' + value}
              onChange={(e) => {
                const text = e.target.value.replace(/^R\$\s*/, '');
                setValue(text);
              }}
            />
            <Button onClick={() => { navigate('/home'); transferir(); }}>Confirmar</Button>
          </Container>
          <Container>
            <ContainerLine>
              <Button4 style={{ visibility: 'hidden' }} />
              <Button4 onClick={ShowContainer}>
                <span>Voltar</span>
              </Button4>
            </ContainerLine>
          </Container>
        </>
      )}
    </>
  );
}
