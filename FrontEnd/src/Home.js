import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loadTodo, postTodo, deleteTodo } from "./redux/modules/write";

import Header from "./Header";

const Home = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const write_ref = React.useRef(null);

  const write_data = useSelector((state) => state.write.list);

  console.log(write_data);

  React.useEffect(() => {
    dispatch(loadTodo());
  }, []);

  const postTodoList = () => {
    dispatch(
      postTodo({
        todo: write_ref.current.value,
        checkComplete: false,
      })
    );
  };

  console.log(write_data);
  return (
    <>
      <Header />

      <Container>
        <Date>
          <button>◀</button>
          <p> 6 / 17 </p>
          <button>▶</button>
        </Date>

        <Box>
          {write_data.map((list, index) => {
            return (
              <Todo key={index}>
                <span>{list.todo}</span>
                <button>완료</button>
                <button
                  onClick={() => {
                    dispatch(deleteTodo(list.id));
                  }}
                >
                  삭제
                </button>
                <button>수정</button>
              </Todo>
            );
          })}
        </Box>
        <input
          type="text"
          ref={write_ref}
          placeholder="  목표를 입력해주세요"
        />
        <button
          className="Plus"
          onClick={() => {
            postTodoList();

            // navigate("/Todo");
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
  height: 650px;
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
  height: 350px;
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

  & p {
  }
  & button {
    float: right;
    margin: 3px;
  }
`;

export default Home;
