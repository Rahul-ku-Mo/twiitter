import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserPage from "./components/UserPage";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import Feeds from "./components/Home";

const App = () => {
  return (
    <div>
      <Router>
        <Route path="/" exact component={UserRegister} />
        <Route path="/userPage" exact component={UserPage} />
        <Route path="/userLogin" exact component={UserLogin} />
        <Route path="/feeds" exact component={Feeds} />

        <ToastContainer />
      </Router>
    </div>
  );
};

export default App;
