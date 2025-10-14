import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container, Left, Orbit, Right } from './style';
import DataTable1 from '../../components/datatable';
import DataTableAdmin from '../../components/datatableadmin';
import { Client } from '../../api/client';
import { OrbitProgress } from 'react-loading-indicators';

export default function Home() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);

  function fetchData() {
    setLoad(true);

    setTimeout(() => {
      Client.get('/auth/me')
        .then((res) => {    
        })
        .catch(function (error) {
          navigate('/login');
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

  return (
    <Container>
      <Left>
        <DataTable1 />
      </Left>
      <Right>
        <DataTableAdmin />
      </Right>
    </Container>
  );
}
