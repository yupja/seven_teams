import axios from "axios";
// import { setCookie, getCookie, deleteCookie } from "../../cookie";


const LOGIN = "LOGIN"
const SIGNUP = "SIGNUP"
const LOGOUT = "LOGOUT"
const ISLOGIN = "ISLOGIN"

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

export function signupAction(){
    console.log("signup action");
    return {type : SIGNUP, initialState}
}

export function loginAction(newUserState){
    console.log("login action");
    return {type : LOGIN, newUserState}
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

export const signupCO = (username, password, passwordCheck, nickname) => {
    let data={
            username : username,
            nickname : nickname,
            password : password,
            passwordCheck : passwordCheck}
 return function (dispacth ,{history}) {
     axios.post("http://localhost:8090/user/signup",data
        // axios.post("http://wisebookshop.com/user/signup",data
        // axios.post("http://localhost:5001/users",data
        ).then(response => {
            console.log(response);
            
        })
        // history.push("/login");
    }

}

export const loginCO = (username, password) => {
    let data={
        username : username,
        password : password
    }
    const frm = new FormData()
    frm.append('username', username)
    frm.append('password', password)
    return function (dispacth) {
        // axios.post("http://wisebookshop.com/user/login",frm
        axios.post("http://localhost:8090/user/login", data
        // axios.post("http://localhost:5001/users",data
        ).then(response => {
            let tset = response.headers.authorization;
            debugger;
            // dispacth(
            //     {
            //         is_login: true
            //     }
            // )
            // setCookie("Authorization", response.headers.authorization.split(" ")[1]);
            // setCookie("username", username);
                console.log("로그인 서버요청");
        })
        .catch(error => {
            alert("아이디 또는 비밀번호를 확인해주세요.")
            console.log("Login Error", error)
          })
    }
}

export const logOut = (receiveUserInfo) =>{
    return function (dispacth){
        sessionStorage.clear();
        const logOutInfo ={
            nickname: "비회원",
            is_login : false
        }

        console.log(logOutInfo);


        dispacth(logoutAction(logOutInfo));

    }
}

//리듀서

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "SIGNUP":{
            return {list : initialState}
        }

        case "LOGIN":{
            return {list : initialState}
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