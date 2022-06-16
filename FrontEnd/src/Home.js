import React from "react";
import "./App.css";
import Header from "./Header";
import todologo from "./img/todologo.png";
import axios from "axios";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadTodo, deleteTodo, completeTodo } from "./redux/modules/write";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

const Home = (props) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const write_data = useSelector((state) => state.write.list);

  // const getTodoList = async () =>  {
  //   const res = await axios.get("http://whitewise.shop/todo/2022-06-18")
  //   .then((response) => {
  //     dispatch(loadWrite([...response.data]));
  // });
  // React.useEffect(async() => {
  //   getTodoList();
  // }, []);
  // };

  React.useEffect(() => {
    dispatch(loadTodo());
  }, []);

  return (
    <>
      <Header />

      <Container>
        <LogoImage alt="todologo" src={todologo} />
        <Date>
          {/* 인풋버튼 만들어 네비게이트 써볼까?? 날짜 고르면 뜰수있게 */}
          <span>◀</span>
          <input type="date" />
          <span>▶</span>
        </Date>

        <Box>
          {write_data.map((list, index) => {
            return (
              <Todo checkComplete={list.checkComplete} key={index}>
                <span>{list.todo}</span>
                <DeleteIcon
                  className="button"
                  cursor="pointer"
                  onClick={() => {
                    dispatch(deleteTodo(list));
                  }}
                />
                <CheckIcon
                  className="button"
                  cursor="pointer"
                  onClick={() => {
                    dispatch(completeTodo(list));
                  }}
                />
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
        <button className="Up"
        onClick={()=> {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}>UP</button>
      </Container>
    </>
  );
};

const LogoImage = styled.img`
  width: 20%;
  margin: 20px 330px;
`;

const Container = styled.div`
  width: 800px;
  min-height: 680px;
  margin: 20px auto;
  padding: 16px;
  border: 3px solid;
  border-radius: 30px;
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
    width: 100px;
    height: 100px;
    margin: auto;
    background-color: gray;
    border: 1px dark;
    border-radius: 50%;
    font-size: 50px;
    cursor: pointer;
    color: white;
    background-color: #292929;
    position: fixed;
    right: 20px;
    bottom: 20px;
    :hover{
      background-color: #d0d0d0;
  }
  .Plus {
    width: 100px;
    height: 100px;
    margin: auto;
    background-color: gray;
    border: 1px dark;
    border-radius: 50%;
    font-size: 50px;
    cursor: pointer;
    color: white;
    background-color: #292929;
    position: fixed;
    right: 20px;
    bottom: 20px;
    :hover{
      background-color: #d0d0d0;
  }
  & h1 {
    text-align: center;
  }
`;

const Date = styled.div`
  width: 600px;
  height: 30px;
  margin: auto;
  padding: 16px;
  border: 2px solid;
  border-radius: 5px;
  display: flex;
  & input {
    border: none;
    margin: auto;
    width: 100px;
    height: 30px;
  }
  & span {
    cursor: pointer;
  }
`;

const Box = styled.div`
  width: 600px;
  min-height: 500px;
  margin: auto;
  padding: 16px;
  border: 2px solid;
  border-radius: 5px;
  display: column;
  & p {
    margin: auto;
  }
`;

const Todo = styled.div`
  width: 580px;
  height: 30px;
  padding: 10px;
  border: 2px gray solid;
  box-shadow: 1px;
  border-radius: 5px;

  color: ${(props) => (props.checkComplete ? "white" : "dark")};
  background-color: ${(props) => (props.checkComplete ? "#ff7675" : "#74b9ff")};
  & p {
  }
  .button {
    float: right;
    margin: 3px;
  }
`;

export default Home;
