import styled from 'styled-components';
import fundo from '../../images/background.jpg';

export const Container = styled.div`
  background: 
    linear-gradient(135deg, rgba(0, 180, 160, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%),
    url(${fundo}) center/cover fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;

  @media (max-width: 768px) {
    background: 
      linear-gradient(135deg, rgba(0, 180, 160, 0.15) 0%, rgba(0, 0, 0, 0.4) 100%),
      url(${fundo}) center/cover;
  }
`;