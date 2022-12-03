import * as React from "react";
import { ToastContainer } from "react-toastify";
// import { AuthContext } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import UserPage from "./components/UserPage";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import Feeds from "./components/Home";
// import { useContext } from "react";

const App = () => {
  // const { currentUser } = useContext(AuthContext);

  //Protective routing for login and logout
  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/userLogin" />;
  //   }
  // };

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<UserRegister />} />
        <Route path="/userPage" exact element={<UserPage />} />
        <Route path="/userLogin" exact element={<UserLogin />} />
        <Route path="/feeds" exact element={<Feeds />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
