import styled from 'styled-components';

export const Container = styled.div`
  background-color: #3c3c3cff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 5%;
  min-height: 100vh;
  min-width: 50%;
`;
export const Container2 = styled.div`
  background-color: rgba(38, 38, 38, 1);
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  gap: 20px;
  height: 530px;
  width: 100%;
`;
export const ContainerLine = styled.div`
  display: flex;
  gap: 20px;
`;
export const Orbit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: #3c3c3cff;
  display: flex;
  gap: 20px;
  padding: 5%;
`;

export const Title = styled.h1`
  font-size: 50px;
  margin-left: 20px;
  color: #c0c0c0ff;
`;

export const SubTitle = styled.h1`
  margin-bottom: 10%;
  color: #c0c0c0ff;
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
  background-color: #1e1e1ecb;
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  cursor: grab;

  &:hover {
    background-color: #101010cb;
    transition: all 0.2s ease-in-out;
  }
`;
export const Button2 = styled.button`
  box-sizing: border-box;
  width: 10%;
  height: 35px;
  background-color: #1e1e1ecb;
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  border: none;
  border-radius: 10px;
  cursor: grab;

  &:hover {
    background-color: #101010cb;
    transition: all 0.2s ease-in-out;
  }
`;
export const Button3 = styled.button`
  box-sizing: border-box;
  width: 200px;
  height: 430px;
  background-color: #1e1e1ecb;
  color: white;
  font-size: 70px;
  font-weight: bold;
  margin-top: 10px;
  border: none;
  border-radius: 10px;
  cursor: grab;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #101010cb;
    transition: all 0.2s ease-in-out;
  }

  span {
    position: absolute;
    bottom: 100px; /* começa fora do botão */
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }

  &:hover span {
    bottom: 115px;
    opacity: 1;
  }
`;

export const Button4 = styled.button`
  box-sizing: border-box;
  width: 200px;
  height: 430px;
  background-color: #1e1e1ecb;
  color: white;
  font-size: 70px;
  font-weight: bold;
  margin-top: 10px;
  border: none;
  border-radius: 10px;
  cursor: grab;
  position: absolute;

  &:hover {
    background-color: #101010cb;
    transition: all 0.2s ease-in-out;
  }

  span {
    position: absolute;
    bottom: 100px; /* começa fora do botão */
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }

  &:hover span {
    bottom: 115px;
    opacity: 1;
  }
`;
