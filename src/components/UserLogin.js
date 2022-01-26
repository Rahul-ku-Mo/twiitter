import { React, useState,useEffect } from "react";
import { TextField, Container, Stack, Button } from "@mui/material";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../Firebase";
import { toast } from "react-toastify";

const UserLogin = () => {
  const [email, setNewEmail] = useState("");
  const [password, setNewPassword] = useState("");
  const [load, setLoad] = useState(false);

  const signCredential = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Sign in successfully");

      window.location.assign("http://localhost:3000/userPage");
      setLoad(true);
    } catch (error) {
      toast.error(error.message.slice(-15, -2));
    }
  };

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset sent to Email");
      })
      .catch((error) => {
        toast.error(error.message.slice(-15, -2));
        // ..
      });
  };

  useEffect(() => {
    console.log(auth.currentUser);
    return () => {
     
    }
  }, [])
  return (
    <div
      className="ui raised padded text container segment"
      style={{ marginTop: "10px" }}
    >
      <div className="ui sizer vertical segment">
        <div className="ui huge header center aligned">Sign In</div>
      </div>
      <Stack spacing={2}>
        <TextField
          id="outlined-basic"
          label="Username or Email"
          variant="outlined"
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div
          className="ui button center aligned"
          onClick={resetPassword}
          style={{ marginTop: "15px" }}
        >
          Forgot Password ?
        </div>

        <div 
          className="ui primary button center aligned"
          style={{ marginTop: "15px" }}
          onClick={signCredential}
        >
          Sign In
        </div>

        <div className="ui sub header center aligned">
          <Link to="/">Not Signed in? Sign Up!</Link>
        </div>
      </Stack>
    </div>
  );
};

export default UserLogin;
