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

export default function ApplicationTable() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [load, setLoad] = useState(false);
  //const [viewData, setViewData] = useState(false);
  //const [viewContainer, setViewContainer] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();



  async function aplicacao() {
    setLoad(true)
    try {
      const remetenteId = user.id
      const valorNumerico = parseFloat(value.replace(',', '.'))

      const response = await Client.post('/aplicacao', {
        remetenteId,
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
    //setViewData(true);
  }, );

  return (
    <>
          <Container>
            <ContainerLine>
              <Button4 onClick={() => navigate('/home')}>
                <span>Voltar</span>
              </Button4>
            </ContainerLine>
          </Container>
        </>
  );
}
