import { Container, Title } from './style'; // Removido Button não utilizado
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Corrigido import
import NavDropdown from 'react-bootstrap/NavDropdown';
import DropTitle from "../droptitle";
import UserContext from '../../contexts/UserContext'
import { Client, removeToken } from '../../api/client';
import { removePermissions } from '../../service/PermissionService'
import { getDataUser, removeDataUser } from '../../service/UserService'

export default function DataTable1() {
  const { setUser } = useContext(UserContext);
  const [dataUser, setDataUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getDataUser();
    if (userData) {
      setDataUser(userData);
    }
  }, []);

  async function logout() {
    try {
      await Client.post('/auth/logout');
    } catch (error) {
      console.log(error);
    } finally {
      removeToken();
      removePermissions();
      removeDataUser();
      setUser(null);
      navigate('/login');
    }
  }

  if (!dataUser) {
    return (
      <Container>
        <Title>BANIF bank</Title>
        <div>Carregando...</div>
      </Container>
    );
  }

  return (
    <Container>
      <Title>BANIF bank</Title>
      <NavDropdown 
        title={<DropTitle text={dataUser.fullName || "Usuário"} />} 
        id="navbarScrollingDropdown" 
        className="me-4"
      >
        <NavDropdown.Item as="span" className="me-5">
          {dataUser.email || "Email não disponível"}
        </NavDropdown.Item>
        <NavDropdown.Item onClick={logout} className="me-5">
          Sair
        </NavDropdown.Item>
      </NavDropdown>
    </Container>
  );
}