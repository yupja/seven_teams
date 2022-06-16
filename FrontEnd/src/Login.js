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
                <Text>아이디</Text>
                <Li>
                    <Input ref={id_ref}></Input>
                </Li>
                <Text>비밀번호</Text>
                <Li>
                    <Input ref={pw_ref} type="password"></Input>
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
font-size: 20px;
text-align: left;
margin-top: 20px;
margin-bottom: 7px;
`; 

const Input = styled.input`
width: 550px;
height: 50px;
font-size: 30px;
/* font-weight: 800; */
border: none;
border-bottom:3px solid #292929;
:focus{
    outline: none;
}
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
color: white;
background-color: #292929;
width: 570px;
height: 80px;
margin-top: 50px;
margin-right: 50px;
border: none;
border-radius: 50px;
font-size: 20px;
:hover{
    background-color: #d0d0d0;
}
`;

const Btnsign = styled.button`
color: white;
background-color: #292929;
width: 570px;
height: 80px;
margin-top: 20px;
margin-right: 50px;
border: none;
border-radius: 50px;
font-size: 20px;
:hover{
    background-color: #d0d0d0;
}
`;

export default Login;