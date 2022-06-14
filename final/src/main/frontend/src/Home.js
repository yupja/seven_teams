import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "./Header"



const Home = (props) => {
  const navigate = useNavigate();

  return (
    <>
    <Header/>
    <Container>
      <Date>
        <button>◀</button>
        <p>6/10</p>
        <button>▶</button>
      </Date>
      <Box>
        <Todo>
          <span>밥먹고 코드짜기 코드짜기 코드짜기 코드짜기코드짜기 가자</span>
          <button>완료</button>
          <button>삭제</button>
          <button>수정</button>
        </Todo>
      </Box>
      <button
        className="Plus"
        onClick={() => {
          navigate("/Todo");
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
  height: 600px;
  margin: 20px auto;
  padding: 16px;
  border: 1px solid;
  & div {
    margin: 20px auto;
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
  display: flex;
  & p {
    margin: auto;
  }
`;

const Todo = styled.div`
  width: 600px;
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
