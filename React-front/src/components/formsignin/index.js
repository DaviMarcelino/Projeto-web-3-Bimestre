import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { OrbitProgress } from 'react-loading-indicators';
import { useLocation } from 'react-router-dom';
import { Client, setToken } from '../../api/client';
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
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  const [load, setLoad] = useState(false);
  const [view, setView] = useState(false);
  const navigate = useNavigate();

  function Authenticate() {
    const user = {
      cidade: city,
      estado: state,
      rua: street,
      numero: houseNumber,
    };
    setView(false);

    if (!city || !state || !street || !houseNumber) {
      setView(1);
    } else {
      console.log(user);
      navigate('/create2', { state: { user } });
    }
  }

  return (
    <Container>
      <Title>Informe seu</Title>
      <Title>endereço</Title>
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
            id="city"
            name="city"
            placeholder="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <InputTop
            id="state"
            name="state"
            placeholder="Estado"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

          <InputTop
            id="street"
            name="street"
            placeholder="Rua"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />

          <InputBottom
            id="house_number"
            name="house_number"
            placeholder="Número da residência"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
          />

          {view === 1 && (
            <MsgBox>
              <p>Complete os dados</p>
            </MsgBox>
          )}
          {view === 2 && (
            <MsgBox>
              <p>Dados incestos</p>
            </MsgBox>
          )}

          <SendBox>
            <Submit value="Próximo" onClick={() => navigate('/create2')} />
            <CreateButton onClick={() => navigate('/login')}>
              Voltar
            </CreateButton>
          </SendBox>
        </>
      )}
    </Container>
  );
}
