import { React, useState } from "react";
import { TextField, Container, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "../Firebase";

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
      console.log(err.message)
    }
  };

  return (
    <Container maxWidth="sm">
      <div className="ui sizer vertical segment">
        <div className="ui huge header center aligned">Register</div>
      </div>

      <Stack spacing={2}>
        <TextField
          id="outlined-basic-reg"
          label="Username"
          variant="outlined"
          autoComplete="off"
          onChange={(e) => setCreateUser(e.target.value)}
        />
        <TextField
          id="outlined-password-input-reg"
          label="Password"
          type="password"
          onChange={(e) => setCreatePassword(e.target.value)}
        />

        <Button variant="contained" onClick={register}>
          Register
        </Button>
        <Link to="/userLogin" className="ui header">
          <h2 className="ui header">
            <i className="settings icon"></i>
            <div className="content">Sign In</div>
          </h2>
        </Link>
      </Stack>
    </Container>
  );
};
export default UserRegister;
