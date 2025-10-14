import styled from 'styled-components';
import fundo from '../../images/background.jpg';

export const Container = styled.div`
  background-image: url(${fundo});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  min-height: 100vh;
  background-color: white;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;
