import React from "react";
import styled from "styled-components";

import Header from "./Header"
import { useDispatch } from "react-redux";
import { signupCO } from "./redux/modules/user";
import { idCheck } from "./redux/modules/user";
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
    }

    const idReCheck = () => {
        dispatch(idCheck(
            id_ref.current.value
        ))
    }

    return (
        <>
        <Header/>
        <Box>
        <h1>회원가입</h1>
        <Ul>
            <Li>
                <Text>닉네임</Text>
                <Input ref={nick_ref}></Input>
                <BtnCheck>중복확인</BtnCheck>
            </Li>
            
            <Li>
                <Text>아이디</Text>
                <Input ref={id_ref}></Input>
                <BtnCheck onClick={idReCheck}>중복확인</BtnCheck>
            </Li>
            <Li>
                <Text>비밀번호</Text>
                <Input ref={pw_ref}></Input>
            </Li>
            <Li>
                <Text>비밀번호 재확인</Text>
                <Input ref={pwCheck_ref}></Input>
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

const Btnsign = styled.button`

`;

const BtnCheck = styled.button`

`;

export default Signup;