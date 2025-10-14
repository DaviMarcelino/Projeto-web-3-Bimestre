import styled from 'styled-components';

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  min-height: 100vh;
`;

export const Title = styled.h1`
  font-size: 50px;
  color: white;
  margin-bottom: 5px;
  padding: 20px;
`;

export const Label = styled.label`
  display: block;
  font-size: 18px;
  border: 10px;
  padding: 20px;
  margin-top: 15px;
  margin-bottom: 5px;
`;

export const Button = styled.button`
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  background-color: #272727a9;
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  border: none;
  cursor: grab;

  &:hover {
    background-color: #1e1e1ecb;
    transition: all 0.2s ease-in-out;
  }
`;