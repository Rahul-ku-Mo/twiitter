import { React, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase";
import signImg from "../Icons/signup-image.jpg";
import style from "./UserRegister.module.css"
const UserRegister = () => {
  const [createUser, setCreateUser] = useState("");
  const [createPassword, setCreatePassword] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        createUser,
        createPassword
      );

      window.location.assign("http://localhost:3000/userLogin");
      toast.success("Registered Successfully");
    } catch (err) {
      toast.error(err.message.slice(-15, -2));
      console.log(err.message);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        margin: "100px auto",
        border: "2px solid #E5E5E5",
        padding: "80px 70px !important",
        width: "805px",
        justifyContent: "space-around",
        alignItems: "center",
        backdropFilter: "blur(4px)",
      }}
    >
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
          Sign up
        </Typography>
        <input
          id="outlined-basic-reg"
          placeholder="Username"
          variant="outlined"
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
          onChange={(e) => setCreateUser(e.target.value)}
        />
        <input
          id="outlined-password-input-reg"
          placeholder="Password"
          type="password"
          style={{
            height: "46px",
            fontFamily: "'Poppins', sans-serif",
            marginBottom: "30px",
            boxShadow: "0px 4.00498px 50.0622px rgba(79, 67, 67, 0.15)",
            padding: "21px 14px",
            fontSize: "12px",
          }}
          onChange={(e) => setCreatePassword(e.target.value)}
        />
        <Typography
          onClick={register}
          className={style.btn}
          sx={{
            display: "flex",
            background: "rgba(133, 174, 236, 1)",
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
          Register
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <img src={signImg} style={{ height: "359", width: "332" }} />
        <Link
          to="/userLogin"
          style={{
            textDecoration: "underline",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          I have already signed up
        </Link>
      </Box>
    </Container>
  );
};
export default UserRegister;
