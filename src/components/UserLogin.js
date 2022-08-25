import { React, useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import signinImg from "../Icons/signin-image.jpg";
import style from "./UserLogin.module.css";

import { Link } from "react-router-dom";
import { auth } from "../Firebase";
import { toast } from "react-toastify";

const UserLogin = () => {
  const [email, setNewEmail] = useState("");
  const [password, setNewPassword] = useState("");
  

  const signCredential = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Sign in successfully");

      window.location.assign("http://localhost:3000/userPage");
     
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
    return () => {};
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        margin: "100px auto",
        border: "2px solid #E5E5E5",
        padding: "80px 70px !important",
        width: "100%",
        maxWidth: "fit-content",
        justifyContent: "space-around",
        alignItems: "center",
        backdropFilter: "blur(4px)",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <img
          src={signinImg}
          className={style.my_image}
          style={{ height: "359", width: "332" }}
          alt={""}
        />
        <Link
          to="/"
          style={{
            textDecoration: "underline",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          Sign up now
        </Link>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", marginRight: "28px" }}
      >
        <Typography
          sx={{
            fontSize: "36px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "600",
            lineHeight: "54px",
            letterSpacing: "0.02em",
          }}
        >
          Sign In
        </Typography>
        <input
          placeholder="Email"
          value={email}
          autoComplete="off"
          style={{
            height: "46px",
            width: "295px",
            fontFamily: "'Poppins', sans-serif",
            margin: "30px 0px",
            boxShadow: "0px 4.00498px 50.0622px rgba(79, 67, 67, 0.15)",
            fontSize: "12px",
            padding: "21px 14px",
          }}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          value={password}
          type="password"
          style={{
            height: "46px",
            fontFamily: "'Poppins', sans-serif",
            marginBottom: "30px",
            boxShadow: "0px 4.00498px 50.0622px rgba(79, 67, 67, 0.15)",
            padding: "21px 14px",
            fontSize: "12px",
          }}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Typography
          onClick={signCredential}
          className={style.btn}
          sx={{
            display: "flex",
            background: "#5D8BF4",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "600",
            fontSize: "12px",
            borderRadius: "9px",
            width: "132px",
            height: "33px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          Sign In
        </Typography>
        <Typography
          onClick={resetPassword}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "12px",
            marginTop: "20px",
            cursor: "pointer",
          }}
          className={style.link}
        >
          Forgot Password
        </Typography>
      </Box>
    </Container>
  );
};

export default UserLogin;
