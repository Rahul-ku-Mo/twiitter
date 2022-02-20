import { React, useState, useEffect } from "react";
import logo from "../Icons/logo.png";
import notify from "../Icons/notify.png";
import homeLogo from "../Icons/home.jpg";
import homeMsg from "../Icons/msg.jpg";
import homeProfile from "../Icons/profile.jpg";
import { db, auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Tweets from "./Tweets";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  serverTimestamp,
  setDoc
} from "firebase/firestore";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import NewUserPage from "./NewUserPage";
import Follow from "./Follow";

const Feeds = () => {
  const user = auth.currentUser;
  const stat = "hello this is my status";
  const [tweets, setTweets] = useState([]);
  const [time, setTime] = useState(Date.now);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [followers, setFollowers] = useState([]);
  const [summary, setSummary] = useState("");
  const [add, setAdd] = useState(false);
  const [del, setDel] = useState(false);
  const [showNewUser, setShowNewUser] = useState(false);
  const tweetCollectionRef = collection(db, "tweets", user.uid, "userPosts");
  const userCollectionRef = collection(db, "userDetails");
  const userFollowingRef = collection(
    db,
    "following",
    user.uid,
    "userFollowing"
  );
  //create C Tweet
  const addToDb = async () => {

      await setDoc(doc(db,"tweets",user.uid),{});

      await addDoc(tweetCollectionRef, {
        Name: name,
        Summary: summary,
        UserId: user.uid,
        Date: time,
      });
      setAdd(true);
      console.log(serverTimestamp())
      toast.success("done");
   
  };

  // delete D Tweet
  const deleteFeed = async (id) => {
    const tweetdoc = doc(db, "tweets", id);
    await deleteDoc(tweetdoc);
    setDel(true);
  };
  //side bar btns
  const SideBarList = () => {
    return (
      <div className="ui middle aligned selection list">
        <div className="item">
          <img className="ui avatar image" src={homeLogo} />
          <div className="content">
            <div className="content">
              <div className="header"> Home </div>
            </div>
          </div>
        </div>
        <div className="item">
          <img className="ui avatar image" src={notify} />
          <div className="content">
            <div className="content">
              <div className="header"> Explore </div>
            </div>
          </div>
        </div>
        <div className="item">
          <img className="ui avatar image" src={homeMsg} />
          <div className="content">
            <div className="content">
              <div className="header"> Messages </div>
            </div>
          </div>
        </div>
        <Link to="/userPage" className="item">
          <img className="ui avatar image" src={homeProfile} />
          <div className="content">
            <div className="content">
              <div className="header"> Profile </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  useEffect(() => {
    const fetchDB = async () => {
      const data = await getDocs(userCollectionRef);

      const snaps = await getDocs(userFollowingRef);
      
  

      setFollowers(
        data.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
          Followers: 22,
          Following: snaps.size,
          Status: stat,
        }))
      );
    };
    fetchDB();
    
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
        console.log(tweets);
      } else {
        console.log("not logged in");
      }
    });

    const fetchFromDB = async () => {
      const data = await getDocs(tweetCollectionRef);
      setTweets(
        data.docs.map((doc) => ({ ...doc.data(), tweetDocId: doc.id }))
      );
    };
    fetchFromDB();
  }, [add, del]);

  return (
    <div className="grid grid-cols-6  gap-5 grid-auto-rows">
      <div className="col-start-2 col-end-3 p-4 h-fit  ">
        <h2 className="ui header">
          <img src={logo} className="ui circular image" />
        </h2>
        <div>{SideBarList()}</div>
      </div>
      <div className="col-span-2 p-4 h-fit ">
        <div className="row-span-1 border-b-2 m-2 p-2">
          <div className="ui header">Home</div>
          <div className="item">
            <img src={logo} className="ui avatar image tiny" />
            <input
              type="text"
              placeholder="Whats Happening ?"
              className="font-serif outline-0 my-1 w-96 "
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          <div
            className="ui button primary"
            style={{ marginTop: "10px" }}
            onClick={() => {
              addToDb();
              setAdd(false);
            }}
          >
            tweet
          </div>
        </div>
        <div>
          {!showNewUser ? (
            <Tweets
              tweets={tweets}
              setDel={setDel}
              user={user}
              deleteFeed={deleteFeed}
            />
          ) : (
            <NewUserPage
              toFollow={followers}
              thereTweets={tweets}
              id={id}
              showNew={setShowNewUser}
            />
          )}
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex flex-col w-96 h-96">
          <div className="search">
            <input
              type="text"
              className="rounded-full border-2 p-4 w-96 shadow-lg shadow-zinc-300 text-xl"
              placeholder="Search "
            />
          </div>
          <div className="container bg-black rounded-xl my-2 ">
            <Follow
              followers={followers}
              ShowNew={setShowNewUser}
              user={user}
              Id={setId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feeds;
