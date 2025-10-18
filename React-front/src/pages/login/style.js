import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, #f0f3f1 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    background: #f8f9f8;
  }
`;
