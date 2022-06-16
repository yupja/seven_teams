import React from "react";
import styled from "styled-components";

import Header from "./Header"
import { useDispatch } from "react-redux";
import { signupCO } from "./redux/modules/user";
import { idCheck } from "./redux/modules/user";
import { nickCheck } from "./redux/modules/user";
import { useNavigate } from "react-router";

const Signup = (props) => {
    const dispatch =useDispatch();
    const Navigate = useNavigate

    const id_ref = React.useRef();
    const nick_ref = React.useRef();
    const pw_ref = React.useRef();
    const pwCheck_ref = React.useRef();

    const SignupDispatch = () => {

        let pwCheck = pw_ref.current.value;
        let pwCheck2 = pwCheck_ref.current.value;

        let id = id_ref.current.value;
        let pw = pw_ref.current.value;
        let nick = nick_ref.current.value;

        if(id === '' || pw === '' || nick === ''){
            alert("아이디, 닉네임, 비밀번호를 모두 입력해주세요.")
            return;
        }

        if (pwCheck != pwCheck2){
            alert("비밀번호가 일치하지 않습니다.")
            return;
        }

        dispatch(signupCO(
           id_ref.current.value,
           pw_ref.current.value,
           pwCheck_ref.current.value,
           nick_ref.current.value,
           false
       ))
       Navigate("/");
    }

    const idReCheck = () => {
        
        dispatch(idCheck(
            id_ref.current.value
        ))
    }

    const nickReCheck = () => {
        dispatch(nickCheck(
            nick_ref.current.value
        ))
    }

    return (
        <>
        <Header/>
        <Box>
        <h1>회원가입</h1>
        <Ul>
            <Text>닉네임</Text>
            <Li>
                <Input ref={nick_ref}></Input>
                <BtnCheck onClick={nickReCheck}>중복확인</BtnCheck>
            </Li>
            <Text>아이디</Text>
            <Li>
                
                <Input ref={id_ref}></Input>
                <BtnCheck onClick={idReCheck}>중복확인</BtnCheck>
            </Li>
            <Text>비밀번호</Text>
            <Li>
                
                <Input ref={pw_ref} type="password"></Input>
            </Li>
            <Text>비밀번호 재확인</Text>
            <Li>
                
                <Input ref={pwCheck_ref} type="password"></Input>
            </Li>
            
        </Ul>
            <Btnsign onClick={SignupDispatch}>회원가입</Btnsign>
        
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

width: 400px;
height: 50px;
font-size: 30px;
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
justify-content: left;
margin-bottom: 10px;
`;

const Btnsign = styled.button`
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

const BtnCheck = styled.button`
color: white;
background-color: #292929;
width: 120px;
height: 60px;
font-size: 17px;
border: none;
border-radius: 30px;
margin-left: 20px;
:hover{
    background-color: #d0d0d0;
}
`;

export default Signup;