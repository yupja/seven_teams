import React from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  loadTodo,
  postTodo,
  deleteTodo,
  completeTodo,
} from "./redux/modules/write";

import Header from "./Header";

const Home = (props) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  // const todo_ref = React.useRef(null);
  // const day_ref = React.useRef(null);

  const write_data = useSelector((state) => state.write.list);

  React.useEffect(() => {
    dispatch(loadTodo());
  }, [loadTodo]);

  // const postTodoList = () => {
  //   dispatch(
  //     postTodo({
  //       todo: todo_ref.current.value,
  //       goalDay: day_ref.current.value,
  //       checkComplete: false,
  //     })
  //   );
  // };
  console.log(write_data);

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
            console.log(list);
            return (
              <Todo checkComplete={list.checkComplete} key={index}>
                <span>
                  {list.todo} / {list.goalDay}
                </span>
                <button
                  onClick={() => {
                    dispatch(deleteTodo(list.id));
                  }}
                >
                  삭제
                </button>
                <button
                  className="list_item"
                  onClick={() => {
                    dispatch(completeTodo(list.id));
                  }}
                >
                  완료
                </button>
              </Todo>
            );
          })}
        </Box>
{/* 
        <input type="date" ref={day_ref} placeholder="  기간을 입력해주세요" />
        <input type="text" ref={todo_ref} placeholder="  목표를 입력해주세요" /> */}

        <button
          className="Plus"
          onClick={() => {
            // postTodoList();
            Navigate("/todo")
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
