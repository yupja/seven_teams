import React from "react";
import axios from "axios";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  loadTodo,
  deleteTodo,
  completeTodo,
} from "./redux/modules/write";

import Header from "./Header";

const Home = (props) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();


  const write_data = useSelector((state) => state.write.list);

  // const getTodoList = async () =>  {
  //   const res = await axios.get("http://whitewise.shop")
  //   console.log(res)
  // }
  // React.useEffect(async() => {
  //   getTodoList();
  // }, []);

  React.useEffect(() => {
    dispatch(loadTodo());
  }, []);



  return (
    <>
      <Header />

      <Container>
        <Date>
          <button>◀</button>
          <p> 22.06.16 </p>
          <button>▶</button>
        </Date>

        <Box>
          {write_data.map((list, index) => {
            console.log(list)
            return (
              
              <Todo checkComplete={list.checkComplete} key={index}>
                <span>
                  {list.todo}
                </span>
                <button
                  onClick={() => {
                    dispatch(deleteTodo(list));
                  }}
                >
                  삭제
                </button>
                <button
                  className="list_item"
                  onClick={() => {
                    dispatch(completeTodo(list));
                  }}
                >
                  완료
                </button>
              </Todo>
            );
          })}
        </Box>

        <button
          className="Plus"
          onClick={() => {
            Navigate("/todo");
          }}
        >
          +
        </button>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 800px;
  height: 700px;
  margin: 20px auto;
  padding: 16px;
  border: 1px solid;
  & div {
    margin: 20px auto;
  }

  & input {
    width: 625px;
    height: 30px;
    margin: 20px auto;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .Plus {
    width: 635px;
    height: 50px;
    margin: auto;
    justify-content: center;
    align-items: center;
    display: flex;
  }
`;

const Date = styled.div`
  width: 600px;
  height: 30px;
  margin: auto;
  padding: 16px;
  border: 1px solid;
  display: flex;
  & p {
    margin: auto;
  }
`;

const Box = styled.div`
  width: 600px;
  height: 400px;
  margin: auto;
  padding: 16px;
  border: 1px solid;
  display: column;
  & p {
    margin: auto;
  }
`;

const Todo = styled.div`
  width: 580px;
  height: 30px;
  padding: 10px;
  border: 1px solid;
  color: ${(props) => (props.checkComplete ? "#fff" : "#333")};
  background-color: ${(props) =>
    props.checkComplete ? "#673ab7" : "aliceblue"};
  & p {
  }
  & button {
    float: right;
    margin: 3px;
  }
`;

export default Home;
