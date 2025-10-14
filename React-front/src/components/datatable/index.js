import { Container, Title, Button } from './style';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DropTitle from "../droptitle";
import UserContext from '../../contexts/UserContext'
import { Client, removeToken } from '../../api/client';
import { removePermissions } from '../../service/PermissionService'
import { getDataUser, removeDataUser } from '../../service/UserService'
export default function DataTable1() {
  const { user } = useContext(UserContext)
  const dataUser = getDataUser()
  const navigate = useNavigate();
//teste
  function logout() {

    setTimeout(() => {
      Client.post('auth/logout').then(res => {
        removeToken()
        removePermissions()
        removeDataUser()
        navigate('/login')
      })
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => {
        })

    }, 1000)
  }

  return (
    <Container>
      <Title>BANIF bank</Title>
      <>
        <NavDropdown title={<DropTitle text={dataUser.fullName} />} id="navbarScrollingDropdown" className="me-4">
          <NavDropdown.Item href="#" className="me-5">{dataUser.email}</NavDropdown.Item>
          <NavDropdown.Item onClick={() => logout()} className="me-5">Sair</NavDropdown.Item>
        </NavDropdown>
      </>
    </Container>
  );
}
