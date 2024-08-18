import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../src/component/Dashboard/Main";
import Login from "../src/component/Login/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Main />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
