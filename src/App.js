import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./components/UserPage";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import Feeds from "./components/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<UserRegister/>} />
        <Route path="/userPage" exact element={<UserPage/>} />
        <Route path="/userLogin" exact element={<UserLogin/>} />
        <Route path="/feeds" exact element={<Feeds/>} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
