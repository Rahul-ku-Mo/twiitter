import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { React, useEffect, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import logo from "../Icons/logo.png";
import ReplyForm from "./ReplyForm";

import { db } from "../Firebase";
import {
  doc,
  collection,
 
  getDocs,
  updateDoc,
 
} from "firebase/firestore";

const NewUserPage = ({
  toFollow = [],
  thereTweets = [],
  id,
  showNew,
  user,
}) => {
  const [reply, setReply] = useState("");
  const [currentReply, setCurrentReply] = useState("");
  const [rend, setRend] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replies, setReplies] = useState([]);
  const [ID, setID] = useState("");

  const addReply = async (DocId) => {
    await updateDoc(doc(db, "tweets", DocId), {
      ReplyName: user.displayName,
      Reply: reply,
      ReplyID: DocId,
      isReplied: true,
    });

    setRend(true);
  };

  useEffect(() => {
    const fetchAll = async () => {
      const allData = await getDocs(collection(db, "tweets"));

      setReplies(allData.docs.map((doc) => ({ ...doc.data() })));

      console.log("ok");
    };

    fetchAll();
  }, [rend]);

  return (
    <>
      {toFollow.map((people) => {
        if (people.UserId === id) {
          return (
            <div className="container p-1 flex flex-col">
              <div
                onClick={() => {
                  showNew(false);
                }}
              >
                Back
              </div>
              <div className="h-96 w-fit">
                <img src={people.PhotoBG} className="h-96 bg-auto" />
              </div>
              <div>
                <p className="font-bold capitalize text-xl">{people.Name}</p>
                <p className="font-light text-zinc-500 mb-2">@{people.Name}</p>
                <p className="py-2 ">{people.Status}</p>
              </div>
              <div className="flex py-2">
                <div className="pr-2">{people.Following} Following</div>
                <div className="pr-2">{people.Followers} Followers</div>
              </div>
              <div>
                <div className="navbar flex my-3">
                  <li className="list-none px-8 py-4 border-2 hover:bg-black hover:text-white transition duration-500 ease-in-out">
                    Tweets
                  </li>
                  <li className="list-none px-8 py-4 border-2 hover:bg-black hover:text-white transition duration-500 ease-in-out">
                    Tweets & replies
                  </li>
                </div>
              </div>
            </div>
          );
        }
      })}

      <div>
        {thereTweets.map((twt) => {
          if (twt.UserId === id) {
            return (
              <>
                <div className="container mx-auto px-10 py-10 bg-slate-100 flex">
                  <img
                    className="w-20 h-20 self-center"
                    src={logo}
                    alt="logo"
                  />
                  <li className="flex-col list-none bg-zinc-200/100 w-96 p-4">
                    <Typography
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "800",
                        fontSize: "15px",
                        color: "#8c0404",
                      }}
                    >
                      {twt.Name}
                    </Typography>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif" }}>
                      {twt.Summary}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "300",
                      }}
                    >
                      {twt.Date}
                    </Typography>

                    <div className="flex list-none">
                      <ul>
                        <BiLike className="cursor-pointer mr-7" />
                      </ul>
                      <ul>
                        <BiDislike className="cursor-pointer mr-7" />
                      </ul>
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: "800",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          addReply(twt.tweetDocId);
                          setCurrentReply(reply);
                          setRend(false);
                        }}
                      >
                        Reply
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: "800",
                          fontSize: "12px",
                          cursor: "pointer",
                          marginLeft: "10px",
                        }}
                        onClick={() => {
                          setShowReplyBox(true);
                        }}
                      >
                        Show Reply
                      </Typography>
                    </div>
                    <input
                      onChange={(e) => {
                        setReply(e.target.value);
                        setCurrentReply(twt.Reply);
                      }}
                    />
                  </li>
                </div>
                <Box>
                  {replies
                    .filter((rp) => rp.isReplied === true)
                    .map((rep) => {
                      if (rep.ReplyID === twt.tweetDocId)
                        return (
                          <ReplyForm
                            curReply={rep.Reply}
                            userName={rep.ReplyName}
                            show={showReplyBox}
                          />
                        );
                    })}
                </Box>
              </>
            );
          }
        })}
      </div>
    </>
  );
};
export default NewUserPage;
