import React from "react"
import styled from "styled-components";

import HomeIcon from "@material-ui/icons/Home";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { Cookies,CookiesProvider } from "react-cookie";
import { getCookie } from "./redux/modules/user";

import { logOutCO } from "./redux/modules/user";
import {instance} from "./shared/Request"
const Header = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const [is_login, setIsLogin] = React.useState(false);
    // const is_login = useSelector((state) => state.user.is_login);

    React.useEffect (()=> {             // 쿠키가 있는지없는지 쿠키값 비교
    let cookie = getCookie("authorization");
        console.log(cookie);
    if(cookie){                         // cookie의 여부에 따라 is_login의 값을 업데이트
        setIsLogin(true);
    }else {
        setIsLogin(false);
    }
    console.log(setIsLogin)
    });
    const logOut = () => {
        console.log("로그아웃");
        dispatch(logOutCO);

    if (is_login){                      //is_login이 true일때만 보여줘라
        return(
            <Head>
            <HomeIcon  style={{margin: "0 0 0 25px"}}
              margin="0px"
              cursor="pointer"
              onClick={() => {
                Navigate(`/`)
            }}
            >
            </HomeIcon>
            <Blank></Blank>
            {/* <Sign 
            onClick={() => {
                Navigate(`/signup`)
            }}
            >회원가입</Sign> */}
            <Log onClick={logOut}>로그아웃</Log>
        </Head>
            )}
        }
    
    return (
        <Head>
            <HomeIcon  style={{margin: "0 0 0 25px"}}
              margin="0px"
              cursor="pointer"
              onClick={() => {
                Navigate(`/`)
            }}
            >
            </HomeIcon>
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
    );
};

const Head = styled.div`
    height: 72px;
    width: 1296px;
    background: white;
    margin: 0 auto;
    display: flex;
    align-items: center;
`

const Sign = styled.button`
    height: 50px;
    width: 100px;
    background: none;
    display: flex;
    justify-content : center;
    align-items: center;
    font-size: 20px;
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
    height: 50px;
    width: 100px;
    background: none;
    display: flex;
    justify-content : center;
    align-items: center;
    font-size: 20px;
    border: none;
    font-weight:bolder ;
    &:hover {
        color: gray;
    }
`;


export default Header;