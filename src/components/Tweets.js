import { useMemo } from "react";

import { BiDislike, BiLike, BiX } from "react-icons/bi";
import { compareDates } from "../functions/compareFunction";

const Tweets = ({ tweets, setDel, user, deleteFeed, delay, toFollow }) => {

  console.log(tweets);
  const FilterTweets = useMemo(() => {
    return tweets.sort(compareDates);
  }, [tweets]);

  const getImage = () => {
    let userList = toFollow.find((eachUser) => eachUser.UserId === user.uid);

    return userList.Photo;
  };

  return FilterTweets.map((my_tweet, i) => {
    if (my_tweet.UserId === user.uid) {
      return (
        <div className="container mx-auto px-2 py-2 bg-slate-100 flex rounded-xl justify-evenly mt-2">
          <img
            className="w-20 h-20 self-center rounded-full "
            src={getImage()}
            alt="logo"
          />
          <li className="flex-col list-none bg-slate-100 p-4 rounded-md w-[228px] ">
            <p className=" text-blue-800 font-bold text-xl">{my_tweet.Name}</p>
            <p className="text-lg text-slate-900">{my_tweet.Summary}</p>
            <p className="text-md">{my_tweet.Date}</p>
            <div className="flex list-none justify-between mt-2">
              <ul>
                <BiLike className="cursor-pointer text-slate-800 bg-blue-400 rounded-full h-8 w-8 p-2" />
              </ul>
              <ul>
                <BiDislike className="cursor-pointer  text-slate-800 bg-blue-400 rounded-full h-8 w-8 p-2" />
              </ul>
              <ul>
                <BiX
                  className="cursor-pointer  text-slate-800 bg-blue-400 rounded-full h-8 w-8 p-2"
                  onClick={() => {
                    deleteFeed(my_tweet.tweetDocId);
                    setDel(false);
                  }}
                />
              </ul>
            </div>
          </li>
        </div>
      );
    }

    return null;
  });
};

export default Tweets;
