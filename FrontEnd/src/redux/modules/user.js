import axios from "axios";
import { Cookies,CookiesProvider} from "react-cookie";
import { Navigate } from "react-router";
import { createAction, createReducer, createSlice, createSelector } from "@reduxjs/toolkit";
import instance from "../../shared/Request";



const LOGIN = "LOGIN"
const SIGNUP = "SIGNUP"
const LOGOUT = "LOGOUT"
const ISLOGIN = "ISLOGIN"
const LOADTOKEN = "LOADTOKEN"

const initialState = {
//     list: [{
//         username : "none",
//         nickname : "none",
//         password : "123",
//         password : "123",
//         is_login : false
//     },
// ],
    useInfo: {
        username : "none",
        nickname : "none",
        password : "123",
        passwordCheck : "123"
    },
    is_login : false
};

//액션
export function tokenAction(){
    console.log("token action");
    return {type : LOADTOKEN, }
}

export function signupAction(){
    console.log("signup action");
    return {type : SIGNUP, initialState}
}

export function loginAction(initialState){
    console.log("login action");
    return {type : LOGIN, initialState}
}

export function logoutAction(newUserState){
    console.log("logout action");
    console.log(newUserState);
    return {type : LOGOUT, newUserState}
}

export function isloginAction(newUserState){
    return {type : ISLOGIN, newUserState}
}



//미드루웨어

export const loadTokenCO = () => {
    return function (dispatch) {
      if (getCookie("Authorization")) {
        dispatch(tokenAction());
      }
    };
  };

export const signupCO = (username, password, passwordCheck, nickname) => {
    let data={
            username : username,
            nickname : nickname,
            password : password,
            passwordCheck : passwordCheck}
 return function (dispacth, {history}) {
        axios.post("http://whitewise.shop/user/signup",data
        // axios.post("http://localhost:5001/users",data
        ).then(response => {
          
            console.log(response);
            alert("회원가입이 완료되었습니다.")
            
        })
    }
}
const cookies = new Cookies()

export const setCookie = (name, value, option) => {
    return cookies.set(name, value, {...option})
}

export const getCookie = (name) => {
    return cookies.get(name)
}

export const loginCO = (username, password) => {
    let data={
        username : username,
        password : password
    }
    // const frm = new FormData()
    // frm.append('username', username)
    // frm.append('password', password)
    return function (dispacth) {
        // axios.post("http://whitewise.shop/user/login",frm
        axios.post("http://whitewise.shop/user/login",data
        // axios.post("http://localhost:5001/users",data
        ).then(response => {
            setCookie("Authorization", response.headers.authorization, {
                'path' : '/',
                'secure' : true,
                'sameSite' : 'none'
                });
            getCookie("Authorization");
            dispacth(
                loginAction({
                    is_login: true
                }
             ))
        const result = response.data.authorization;
        if (result) {
          dispacth(loginAction({is_login: true}));
    }})
        .catch(error => {
            alert("아이디 또는 비밀번호를 확인해주세요.")
            console.log("Login Error", error)
          })
    }
}

                                                                                                    // fetch 로그인 시도해보기 ! 
export const idCheck=(username)=>{
    return function(dispatch){
       axios
    //   .get(`http://localhost:5001/users/${username}`)
      .get(`http://whitewise.shop/user/idCheck/${username}`)
      .then(response=>{
        if(response.data===true){
          alert("사용 가능한 아이디입니다.");
        }else{
          alert("중복된 아이디입니다.");
        }
      })
    }
}

export const nickCheck=(nickname)=>{
    return function(dispatch){
       axios
      .get(`http://whitewise.shop/user/nicknameCheck/${nickname}`)
      .then(response=>{
        if(response.data===true){
          alert("사용 가능한 닉네임입니다.");
        }else{
          alert("중복된 닉네임입니다.");
        }
      })
    }
}

// axios 가져오기
export const einstance = axios.create({
    baseURL: '',
    headers: {
       "Authorization": getCookie("Authorization"),
    }
 })
export const loadCookie = () => {
    return function (dispatch) {
        einstance.get("http://whitewise.shop/todo/101010").then((response) => {
        // einstance.get("http://localhost:5001/").then((response) => {
            getCookie("Authorization")
        console.log(response);
        
      });
    };
  };

export const deleteCookie=(name)=>{
        let date =new Date("2020-01-01").toUTCString();
        console.log(date);
        document.cookie =name+"=; expires="+date;
};

export const logOutCOt =(dispatch,{history})=>{
    console.log("로그아웃")
    dispatch(logoutAction());
    history.replace('/');
    window.location.reload();
  }

export const logOutCO = (receiveUserInfo) =>{
    
    return function (dispatch){
        const logOutInfo ={
            nickname: "비회원",
            is_login : false
        }
        console.log("로그아웃");
        dispatch(logoutAction(logOutInfo));
        Navigate(`/`);
    }
}

//리듀서

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "SIGNUP":{
            return {list : initialState}
        }

        case "LOGIN":{
            return {list : action.initialState}
        }

        case "LOGUT":{
            return {list : action.newUserState}
        }

        case "ISLOGIN":{
            return {list : action.newUserState}
        }

        default:
            return state;
    }
}