import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 22% 78%;
  height: 100vh;
  overflow: hidden;
  background-color: #f8f9f8;
  font-family: 'Inter', sans-serif;
`;

export const Left = styled.div`
  background: linear-gradient(180deg, #0b3b2e 0%, #0e4b3b 100%);
  color: #fff;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
`;

export const Right = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, #f4f4f4 100%);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  color: #222;
`;

export const Orbit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  width: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
`;
