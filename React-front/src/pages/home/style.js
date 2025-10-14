import styled from 'styled-components';
import fundo from '../../images/background.jpg';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  height: 100vh;
  overflow: hidden;
`;

export const Left = styled.div`
  background: #222;
  color: white;
  padding: 1rem;
`;

export const Right = styled.div`
  background-image: url(${fundo});
  display: flex;
  padding: 1rem;
`;

export const Orbit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
