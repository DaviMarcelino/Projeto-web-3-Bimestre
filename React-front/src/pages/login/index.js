import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container } from './style';
import FormLogin from '../../components/formlogin';
import { Client } from '../../api/client';
import { OrbitProgress } from 'react-loading-indicators';

export default function Login() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);

  function fetchData() {
    setLoad(true);
    setTimeout(() => {
      Client.get('/auth/me')
        .then((res) => {
          navigate('/home');
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          setLoad(false);
        });
    }, 1000);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return load ? (
    <Container>
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
    </Container>
  ) : (
    <Container>
      <FormLogin />
    </Container>
  );
}
