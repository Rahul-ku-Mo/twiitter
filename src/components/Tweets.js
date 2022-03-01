import {React, useEffect} from "react";
import { BiDislike, BiLike, BiX } from "react-icons/bi";
import logo from "../Icons/logo.png";

const Tweets = ({ tweets, setDel, user, deleteFeed }) => {

  return tweets.map((my_tweet) => {
    if (my_tweet.UserId === user.uid) {
      return (
        <>
          <div className="container mx-auto px-10 py-10 bg-slate-100 flex">
            <img className="w-20 h-20 self-center" src={logo} alt="logo" />
            <li className="flex-col list-none bg-zinc-200/100 w-96">
              <p className="font-serif text-red-800 font-black">
                {my_tweet.Name}
              </p>
              <p className="font-serif">{my_tweet.Summary}</p>
              <p className="font-serif font-extralight text-zinc-500">
                {my_tweet.Date}
              </p>
              <div className="flex list-none justify-between">
                <ul>
                  <BiLike className="cursor-pointer" />
                </ul>
                <ul>
                  <BiDislike className="cursor-pointer" />
                </ul>
                <ul>
                  <BiX
                    className="cursor-pointer"
                    onClick={() => {
                      deleteFeed(my_tweet.tweetDocId);
                      setDel(false);
                    }}
                  />
                </ul>
              </div>
             
            </li>
          </div>
        </>
      );
    }
  });
};

export default Tweets;
