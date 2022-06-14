import React from "react";
import styled from "styled-components";
import { loginCO } from "./redux/modules/user";

import { useDispatch } from "react-redux";

import Header from "./Header"
import { Navigate, useNavigate } from "react-router";


const Login = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const id_ref = React.useRef();
    const pw_ref = React.useRef();
    

    const LoginDispatch = () => {
        if(id_ref === '' || pw_ref === '' ){
            window.alert("아이디/비밀번호를 입력하세요.")
            return;
        }
        console.log(id_ref.current.value, pw_ref.current.value);
        dispatch(loginCO(
            id_ref.current.value,
            pw_ref.current.value
        ))
        Navigate("/");
    }

    return (
        <>
        <Header/>
        <Box>
            <h1>로그인</h1>
            <Ul>
                <Li>
                    <Text>아이디</Text>
                    <Input ref={id_ref}></Input>
                </Li>
                <Li>
                    <Text>비밀번호</Text>
                    <Input ref={pw_ref}></Input>
                </Li>
            </Ul>

            <Btnlog onClick={LoginDispatch}>로그인</Btnlog>
            <Btnsign onClick={() => {
                Navigate(`/signup`)
            }}>회원가입</Btnsign>
        </Box>
        </>
    )
}

const Box = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 50px;
`;

const Text = styled.span`

`; 

const Input = styled.input`

`;

const Ul = styled.ul`
display: flex;
flex-direction: column;
list-style-type: none;
margin-left: -80px;
`;

const Li = styled.li`
display: flex;
justify-content: flex-end;
margin-bottom: 10px;
`;

const Btnlog = styled.button`

`;

const Btnsign = styled.button`

`;

export default Login;