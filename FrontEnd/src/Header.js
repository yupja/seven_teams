import React from "react"
import styled from "styled-components";

import todologo from "./img/todologo.png"

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Cookies,CookiesProvider } from "react-cookie";
import { getCookie } from "./redux/modules/user";

import { logOutCO } from "./redux/modules/user";
import {instance} from "./shared/Request"
const Header = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    
    const [is_login, setIsLogin] = React.useState(false);
    console.log("default",is_login);

   const deleteCookie = (is_login) => {
        let date = new Date("2021-01-01").toUTCString();
        document.cookie = "Authorization" + "=; expires=" + date;
        console.log(document.cookie)
        setIsLogin(false);
        dispatch(logOutCO);
        window.location.reload();
    }

    React.useEffect (()=> {             
    let cookie = getCookie("Authorization");
    // let cookie = loadCookie;
        // console.log(cookie);
    if(cookie != null){  
        setIsLogin(true);
        // console.log("쿠키",is_login);
    }else {
        setIsLogin(false);
        // console.log("cookienull",is_login);
    }
    // console.log(setIsLogin)
    // console.log(getCookie("Authorization"),"확인")
    },[user]);


    if (is_login){      
        return(
            <Head>
            <LogoImage 
            alt="todologo"
            src={todologo}
            onClick={() => {
                Navigate(`/`)
            }}
            />
            <Blank></Blank>
            <Log onClick={deleteCookie}>로그아웃</Log>
        </Head>
            )
        }else{
    return (
        <Head>
            <LogoImage 
            alt="todologo"
            src={todologo}
            onClick={() => {
                Navigate(`/`)
            }}
            />
            <Blank></Blank>
            <Sign 
            onClick={() => {
                Navigate(`/signup`)
            }}
            >회원가입</Sign>
            <Log
            onClick={() => {
                Navigate(`/login`)
            }}
            >로그인</Log>
        </Head>
    )};
};


const Head = styled.div`
    height: 85px;
    width: 1296px;
    background: white;
    margin: 0 auto;
    display: flex;
    align-items: center;
`

const Sign = styled.button`
    height: 60px;
<<<<<<< HEAD
    width: 100px;
=======
    width: 120px;
>>>>>>> a005bcc (최종)
    background: none;
    display: flex;
    justify-content : center;
    align-items: center;
    font-size: 23px;
    border: none;
    font-weight:bolder ;
    &:hover {
        color: gray;
    }
`;
const Blank = styled.div`
    height: 50px;
    width: 1074px;
`

const Log = styled.button`
    height: 60px;
    width: 120px;
    background: none;
    display: flex;
    justify-content : center;
    align-items: center;
    font-size: 23px;
    border: none;
    font-weight:bolder ;
    &:hover {
        color: gray;
    }
`;
const LogoImage = styled.img`
width: 5%;
margin-left: 10px;
`;


export default Header;