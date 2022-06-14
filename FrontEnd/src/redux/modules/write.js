// write.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Actions
const LOAD = "write/LOAD";
const ADD = "write/ADD";
const UPDATE = "write/UPDATE";
const DELETE = "write/DELETE";

const initialState = {
  list: []
};

// Action Creators
export function loadWrite(write_list) {
  return { type: LOAD, write_list };
}

export function postWrite(write) {
  return { type: POST, write };
}

export function deleteWrite(write_id) {
  return { type: DELETE, write_id };
}

// axios 가져오기
export const loadTodo = () => {
  return function (dispatch) {
    axios.get("http://whitewise.shop/todo/101010").then((response) => {
      console.log(response.data);

      const write_list = [...response.data];

      
      // response.data.forEach((b) => {
      //   write_list.push({ todo: b.todo });
      // }); 이렇게 해서 안됐음 한참걸렸따 가져오기 빠르게 하려고 todo를 넣어줘서

      dispatch(loadWrite([...response.data]));
    });
  };
};

// axios 추가하기
export const postTodo = (write) => {
  return function (dispatch) {
    axios.post("http://whitewise.shop/todo/101010", write).then((response) => {
      console.log(response.data);
    });
    dispatch(postWrite(write));
  };
};

// axios 삭제하기
export const deleteTodo = (write_id) => {
  return function (dispatch) {
    axios
      .delete(`http://whitewise.shop/todo/101010/${write_id}`)
      .then((response) => {
        console.log(response);
        const _write_list = getState().write.list;
        const write_index = _write_list.findIndex((b) => {
          return b.id === write_index;
        });
        dispatch(deleteWrite(write_id));
      });
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "write/LOAD": {
      console.log(action);

      return { list: action.write_list };
    }
    // 리듀서를 내보낼건데 state= 값이 없으면 init초기값을 보여줘
    // 액션 타입을 case로 swith 해보자
    // 미들웨어에서 디스패치한 write_list를
    // list에 넣어서 보여줘

    case "write/ADD": {
      console.log("이제 값을 넣을꺼야!");
      const new_write_list = [action.write];
      return { ...state, list: new_write_list };
    }
    // console.log({list: new_write_list});
    // console.log(new_Write_list);
    // 액션에 createWrite이 디스패치되어 case를 switch했다,
    // 리턴값은 리스트에 새로운 버킷리스트를 넣어줄거야

    case "write/DELETE": {
      console.log(state, action);
      const new_write_list = state.list.filter((l, idx) => {
        // 리스트를 나열하고 클릭했을때 나오는 인덱스가 맞으면 빼줘
        return parseInt(action.write_id) !== idx;
      });
      return { list: new_write_list };
    }
    default:
      return state;
  }
}
