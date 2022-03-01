import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import logo from "../Icons/logo.png";

const ReplyForm = ({ userName, replyTime, curReply , show }) => {
  return (
    <>
     {show &&  <Box
        sx={{ display: "flex", margin: "10px", border: "2px solid #ebe6e685" }}
      >
        <Avatar src={logo} sx={{ margin: " 10px" }} />
        <Box>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "800",
              fontSize: "15px",
              color: "#1f71d8",
            }}
          >
           {userName}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
            }}
          >
            {curReply}
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "13px",
            }}
          >
            at wht time
          </Typography>
        </Box>
      </Box>}
    </>
  );
};

export default ReplyForm;
