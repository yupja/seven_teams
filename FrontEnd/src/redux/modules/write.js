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
    einstance.get("http://whitewise.shop/todo/2022-06-18").then((response) => {
      dispatch(loadWrite([...response.data]));
    });
  };
};

// axios 추가하기
export const postTodo = (write) => {
  return function (dispatch) {
    einstance
      .post(`http://whitewise.shop/todo/${write.goalDay}`, write)
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
    dispatch(completeWrite(write));
  };
};

// axios 삭제하기
export const deleteTodo = (write) => {
  return function (dispatch) {
    einstance
      .delete(`http://whitewise.shop/todo/${write.goalDay}/${write.id}`)
      .then((response) => {
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
    case "write/POST": {
      const new_write_list = [action.write];
      return { list: new_write_list, ...state };
    }
    case "write/COMPLETE": {
      console.log(state, action);
    }
    case "write/DELETE": {
    }
    default:
      return state;
  }
}
