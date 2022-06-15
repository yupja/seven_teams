// write.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";

// Actions
const LOAD = "write/LOAD";
const POST = "write/POST";
const COMPLETE = "write/COMPLETE";
const DELETE = "write/DELETE";

const initialState = {
  list: [],
};

// Action Creators
export function loadWrite(write_list) {
  return { type: LOAD, write_list };
}
export function postWrite(write) {
  return { type: POST, write };
}
export function completeWrite(write_id) {
  return { type: COMPLETE, write_id };
}
export function deleteWrite(write_id) {
  return { type: DELETE, write_id };
}

//로그인 쿠키

const cookies = new Cookies();

export const getCookie = (name) => {
  return cookies.get(name);
};

const einstance = axios.create({
  baseURL: "",
  headers: {
    Authorization: getCookie("Authorization"),
  },
});

// axios 가져오기
export const loadTodo = () => {
  return function (dispatch) {
    einstance
    .get("http://whitewise.shop/todo/2022-06-18")
    .then((response) => {
      dispatch(loadWrite([...response.data]));
      console.log(response);

      // response.data.forEach((b) => {
      //   write_list.push({ b });
      // });
      //이렇게 해서 안됐음 한참걸렸따 가져오기 빠르게 하려고 todo를 넣어줘서
    });
  };
};

// axios 추가하기
export const postTodo = (write) => {
  return function (dispatch) {
    einstance
      .post(`http://whitewise.shop/todo/${write.goalDay}`, data)
      .then((response) => {
        console.log(response);
      });
    dispatch(postWrite(write));
  };
};

// axios 완료하기
export const completeTodo = (write) => {
  return function (dispatch) {
    einstance
      .put(`http://whitewise.shop/todo/${write.goalDay}/${write.id}`, {
        checkComplete: true ? "true" : "false",
      })
      .then((response) => {});
    dispatch(completeWrite(write_id));
  };
};

// axios 삭제하기
export const deleteTodo = (write) => {
  return function (dispatch) {
    einstance
      .delete(`http://whitewise.shop/todo/${write.goalDay}/${write.id}`)
      .then((response) => {
        // const _write_list = getState().write.list;
        // const write_index = _write_list.findIndex((b) => {
        //   return b.id === write_index;
        // }); 이것도 악시오스 쓸때 필요가 없음
        dispatch(deleteWrite(write));
      });
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "write/LOAD": {
      return { ...state, list: action.write_list };
    }
    // 리듀서를 내보낼건데 state= 값이 없으면 init초기값을 보여줘
    // 액션 타입을 case로 swith 해보자
    // 미들웨어에서 디스패치한 write_list를
    // list에 넣어서 보여줘

    case "write/POST": {
      const new_write_list = [action.write];

      return { list: new_write_list, ...state };
    }
    // console.log(new_write_list);
    // 액션에 createWrite이 디스패치되어 case를 switch했다,
    // 리턴값은 리스트에 새로운 버킷리스트를 넣어줄거야

    case "write/COMPLETE": {
      console.log(state, action);
    }

    case "write/DELETE": {
      // console.log(state, action);
      // const new_write_list = state.list.filter((l, idx) => {
      //   // 리스트를 나열하고 클릭했을때 나오는 인덱스가 맞으면 빼줘
      //   return parseInt(action.write_id) !== idx;
      // });
      // return { list: new_write_list }; 악시오스 필요X
    }

    default:
      return state;
  }
}
