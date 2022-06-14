import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Todo from "./Todo";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/todo" element={<Todo/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
