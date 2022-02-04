import { React, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import logo from "../Icons/logo.png";
const NewUserPage = ({ toFollow = [], thereTweets = [], id }) => {
  return (
    <>
      {toFollow.map((people) => {
        if (people.UserId === id) {
          return (
            <div className="container p-1 flex flex-col">
              <div className="h-96 w-fit">
                <img src={people.BG} className="h-96 bg-auto"/>
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
              <div className="container mx-auto px-10 py-10 bg-slate-100 flex">
                <img className="w-20 h-20 self-center" src={logo} alt="logo" />
                <li className="flex-col list-none bg-zinc-200/100 w-96">
                  <p className="font-serif text-red-800 font-black">
                    {twt.Name}
                  </p>
                  <p className="font-serif">{twt.Summary}</p>
                  <p className="font-serif font-extralight text-zinc-500">
                    {twt.Date}
                  </p>
                  <div className="flex list-none">
                    <ul>
                      <BiLike className="cursor-pointer mr-7" />
                    </ul>
                    <ul>
                      <BiDislike className="cursor-pointer mr-7" />
                    </ul>
                  </div>
                </li>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};
export default NewUserPage;
