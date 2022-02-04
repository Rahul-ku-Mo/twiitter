import { React, useState } from "react";
import logo from "../Icons/logo.png";
const Follow = ({ followers = [], ShowNew, user, Id  }) => {
  return (
    <>
      <div className="text-slate-200 font-serif mx-4 text-xl my-3 font-extrabold">
        Who to follow
      </div>
      <div className="flex flex-col">
        {followers.map((toFollow) => {
          if (toFollow.UserId !== user.uid) {
            return (
              <div key={toFollow.UserId} className="flex">
                <img src={logo} className="w-24" />
                <div className="container flex flex-col justify-center">
                  <div className="text-md text-slate-500 mx-4">
                    {toFollow.Name}
                  </div>
                  <div className="text-sm text-slate-100 mx-4 lowercase">
                    @{toFollow.Name}
                  </div>
                </div>
                <div
                  className="bg-sky-500 rounded-md p-2 text-slate-100 float-right h-fit self-center m-4 cursor-pointer transition duration-300 ease-in-out hover:scale-110"
                  onClick={() => {
                    Id(toFollow.UserId);
                    ShowNew(true);
                  }}
                >
                  Follow
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Follow;
