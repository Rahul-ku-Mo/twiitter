import { React, useState, useEffect, Fragment } from "react";
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

const Feeds = () => {
  const user = auth.currentUser;

  const [tweets, setTweets] = useState([]);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [followers, setFollowers] = useState([]);
  const [summary, setSummary] = useState("");
  const [add, setAdd] = useState(false);
  const [del, setDel] = useState(false);
  const [showNewUser, setShowNewUser] = useState(false);
  const tweetCollectionRef = collection(db, "tweets");
  const userCollectionRef = collection(db, "userDetails");

  //create C
  const addToDb = async () => {
    try {
      await addDoc(tweetCollectionRef, {
        Name: name,
        Summary: summary,
        UserId: user.uid,
        Date: time,
      });
      setAdd(true);
      setTime(new Date().toLocaleString());
      toast.success("done");
    } catch (err) {
      console.log(err);
    }
  };

  // delete D
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

      setFollowers(data.docs.map((doc) => ({ ...doc.data(), docId: doc.id })));
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
    <div className="ui internally celled grid">
      <div className="row">
        <div className="two wide column">
          <h2 className="ui header">
            <img src={logo} className="ui circular image" />
          </h2>
          <div>{SideBarList()}</div>
        </div>
        <div className="eight wide column">
          <div className="row">
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
        </div>
        <div className="four wide column">
          <div className="flex flex-col w-96 h-96">
            <div className="search">
              <input
                type="text"
                className="rounded-full border-2 p-4 w-96 shadow-lg shadow-zinc-300 text-xl"
                placeholder="Search "
              />
            </div>
            <div className="container bg-black rounded-xl my-2 ">
              <div className="text-slate-200 font-serif mx-4 text-xl my-3 font-extrabold">
                Who to follow
              </div>
              <div className="flex flex-col">
                {followers.map((toFollow) => {
                  if (toFollow.UserId !== user.uid) {
                    return (
                      <>
                        <img src={logo} className="w-24" />
                        <div className="text-md text-slate-500 mx-4">
                          {toFollow.Name}
                        </div>
                        <div className="text-sm text-slate-100 mx-4 lowercase">
                          @{toFollow.Name}
                        </div>
                        <div
                          className="bg-sky-500 rounded-md p-2 text-slate-300 float-right"
                          onClick={() => {
                            setId(toFollow.UserId);
                            setShowNewUser(true);
                          }}
                        >
                          Follow
                        </div>
                      </>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="ten wide column">
          {!showNewUser ? (
            <Tweets
              tweets={tweets}
              setDel={setDel}
              user={user}
              deleteFeed={deleteFeed}
            />
          ) : (
            <NewUserPage toFollow={followers} thereTweets={tweets} id={id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Feeds;
