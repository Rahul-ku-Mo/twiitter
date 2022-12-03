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
} from "firebase/firestore";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import NewUserPage from "./NewUserPage";
import UserList from "./Followers/UserList";

const Feeds = () => {
  const user = auth.currentUser;

  const [tweets, setTweets] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [followers, setFollowers] = useState([]);
  const [summary, setSummary] = useState("");
  const [add, setAdd] = useState(false);
  const [del, setDel] = useState(false);
  const [showNewUser, setShowNewUser] = useState(false);
  const tweetCollectionRef = collection(db, "tweets");

  const userCollectionRef = collection(db, "userDetails");
  const userFollowerRef = collection(
    db,
    "userDetails",
    "0J9rH0wucUyWc3fEkzXx",
    "Followers"
  );
  //create C Tweet
  const addToDb = async () => {
    await addDoc(tweetCollectionRef, {
      Name: name,
      Summary: summary,
      UserId: user.uid,
      Date: new Date().toString().slice(0, 10),
    });
    setAdd(true);

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
          <img className="ui avatar image" src={homeLogo} alt="" />
          <div className="content">
            <div className="content">
              <div className="header"> Home </div>
            </div>
          </div>
        </div>
        <div className="item">
          <img className="ui avatar image" src={notify} alt="" />
          <div className="content">
            <div className="content">
              <div className="header"> Explore </div>
            </div>
          </div>
        </div>
        <div className="item">
          <img className="ui avatar image" src={homeMsg} alt="" />
          <div className="content">
            <div className="content">
              <div className="header"> Messages </div>
            </div>
          </div>
        </div>
        <Link to="/userPage" className="item">
          <img className="ui avatar image" src={homeProfile} alt="" />
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

      setFollowers(
        data.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }))
      );
    };

    fetchDB();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
      } else {
        console.log("not logged in");
      }
    });

    //need to pop from the array
    const fetchFromDB = async () => {
      const data = await getDocs(tweetCollectionRef);
      setTweets(
        data.docs.map((doc) => ({ ...doc.data(), tweetDocId: doc.id }))
      );
    };
    fetchFromDB();
    console.log(tweets);
  }, [add, del]);

  return (
    <div className="grid grid-cols-6  gap-5 grid-auto-rows">
      <div className="col-start-2 col-end-3 p-4 h-fit  ">
        <h2 className="ui header">
          <img src={logo} alt="" className="ui circular image" />
        </h2>
        <div>{SideBarList()}</div>
      </div>
      <div className="col-span-2 p-4 h-fit ">
        <div className="row-span-1 border-b-2 m-2 p-2">
          <div className="ui header">Home</div>
          <div className="item">
            <img src={logo} alt="" className="ui avatar image tiny" />
            <input
              type="text"
              placeholder="Something Special Today...😊"
              className="outline-0 my-1 w-96 "
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          <div
            className="user-btn bg-slate-400 text-slate-100"
            style={{ marginTop: "10px" }}
            onClick={() => {
              addToDb();
              setAdd(false);
            }}
          >
            tweet
          </div>
        </div>

        {!showNewUser ? (
          <Tweets
            toFollow={followers}
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
            user={user}
            showNew={setShowNewUser}
          />
        )}
      </div>
      <div className="col-span-2">
        <div className="flex flex-col my-2">
          <input
            type="text"
            className="rounded-lg border-1 p-4 w-[250px] shadow-lg shadow-zinc-300 text-lg"
            placeholder="Search "
          />
        </div>
        <UserList userList={followers} user_id={user.uid} showNew={setShowNewUser} />
      </div>
    </div>
  );
};

export default Feeds;
