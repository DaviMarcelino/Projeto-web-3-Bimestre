import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { OrbitProgress } from "react-loading-indicators";
import IconPig from "../../images/pig.png";
import IconBank from "../../images/bank.png";
import UserContext from "../../contexts/UserContext";
import { Client, setToken } from "../../api/client";
import { setPermissions } from "../../service/PermissionService";
import { setDataUser } from "../../service/UserService";
import {
  Container,
  Title,
  SubTitle,
  Button,
  Button2,
  Button3,
  Button4,
  ContainerLine,
  Container2,
  Orbit,
} from "./style";

export default function DataTableAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(true);
  const [viewButton, setViewButton] = useState(false);
  const [viewContainer, setViewContainer] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  function ShowContainer() {
    setViewContainer(true);

    if (viewContainer === true) {
      setViewContainer(false);
    }
  }

  function ShowButton() {
    setViewButton(true);

    if (viewButton === true) {
      setViewButton(false);
    }
  }

  function Authenticate() {
    const user = { email: email, password: password };
    setViewButton(false);
    setLoad(true);

    setTimeout(() => {
      Client.post("auth/login", user)
        .then((res) => {
          const load = res.data;
          console.log(load);
          setUser(load.user);
          setDataUser(load.user);
          setToken(load.token.value);
          setPermissions(load.permissions);
          navigate("/home");
        })
        .catch(function (error) {
          setViewButton(true);
          console.log(error);
        })
        .finally(() => {
          setLoad(false);
        });
    }, 1000);
  }

  useEffect(() => {
    Authenticate();
  }, []);

  return load ? (
    <Orbit>
      <OrbitProgress
        variant="spokes"
        color="#cf5387"
        size="small"
        text=""
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
      />
    </Orbit>
  ) : (
    <>
      <Container>
        {viewContainer ? (
          <>
            <Title>Saldo</Title>
            <ContainerLine>
              <Button2 onClick={ShowButton}>𖠂</Button2>
              {viewButton ? (
                <SubTitle>R$ --.--</SubTitle>
              ) : (
                <SubTitle>R$ 300,00</SubTitle>
              )}
            </ContainerLine>

            <Button onClick={ShowContainer}>Consultar extrato</Button>
          </>
        ) : (
          <>
            <Container2></Container2>
            <Button onClick={ShowContainer}>Ocultar extrato</Button>
          </>
        )}
      </Container>
      <Container>
        <ContainerLine>
          <Button4 onClick={() => navigate("/payment")}>
            ❖<span>Criar conta</span>
          </Button4>
          <Button3 style={{ visibility: "hidden" }} />
          <Button3 onClick={() => navigate("/application")}>
            <img src={IconBank} />
            <span>Usuarios</span>
          </Button3>
        </ContainerLine>
      </Container>
    </>
  );
}
