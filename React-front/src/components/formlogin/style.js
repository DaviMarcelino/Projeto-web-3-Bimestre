import styled from 'styled-components';

export const Container = styled.div`
    background-color: rgba(0, 0, 0, 0.45); /* 50% de transparência */
    border-radius: 8px;
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`;

export const Orbit = styled.div`
`;


export const Title = styled.h1`
    font-size: 48px;
    color: white;
    margin-bottom: 5px;
`;

export const Label = styled.label`
    display: block;
    font-size: 18px;
    color: white;
    margin-top: 15px;
    margin-bottom: 5px;
`;

export const InputEmail = styled.input.attrs({ type: 'email' })`
    display: inline-block;
    width: 90%;
    height: 30px;
    border-radius: 8px;
    border: 1px solid gray;
    margin-top: 30px;

    &:focus {
        outline: none;
        background-color: rgba(255, 255, 255, 0.55);
        transition: all 0.1s ease-in-out;
        border: 2px solid gray;
    } 
`

export const InputPassword = styled.input.attrs({ type: 'password' })`
    display: inline-block;
    width: 90%;
    height: 30px;
    border-radius: 8px;
    border: 1px solid gray;
    margin-bottom: 20px;
    margin-top: 30px;

    &:focus {
        outline: none;
        background-color: rgba(255, 255, 255, 0.55);
        transition: all 0.1s ease-in-out;
        border: 2px solid gray;
    } 
`

export const SendBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    width: 90%;
    padding-bottom: 30px;
    border-bottom: 1px solid #0300d0ff;
`

export const MsgBox = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    text-align: center;
    width: 90%;
    padding-top: 10px;
    color: red;
`

export const Submit = styled.input.attrs({ type: 'submit' })`
    box-sizing: border-box;
    width: 130px;
    height: 35px;
    background-color: #0300d0ff;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    margin-top: 20px;
    border: none;
    cursor: grab;

    &:hover {
        background-color: #0300d0ff;
        transition: all 0.2s ease-in-out;
    }

`

export const CreateButton = styled.button`
    box-sizing: border-box;
    width: 130px;
    height: 35px;
    background-color: #000000a9;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    margin-top: 20px;
    margin-left: 40px;
    border: none;
    cursor: grab;

    &:hover {
        background-color: #000000cb;
        transition: all 0.2s ease-in-out;
    }

`

export const LinkForgot = styled.div`
    text-decoration: none;
    cursor: grab;
    font-size: 13px;
    margin-top: 10px;
    color: white;
    font-weight: 600;
    padding-top: 7px;

    &:hover {
        color: #cccccccc;
        transition: all 0.2s ease-in-out;
    }
`