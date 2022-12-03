import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserList = ({ userList = [] , showNew } ) => {
  const [otherUsers, setOtherUsers] = useState([]);

  const { currentUser: cu } = useContext(AuthContext);
  
  useEffect(() => {
    setOtherUsers(userList.filter((user) => user.UserId !== cu.uid));

    console.log(userList);
  }, [cu.uid, userList]);

  return (
    <div className="flex flex-col gap-4">
      {otherUsers.map((ulist,i) => {
        return (
          <>
            <div className="flex bg-slate-100 border-slate-500 shadow-lg gap-4 rounded-lg h-16 max-w-[320px] items-center" key={`${i}*abc`}>
              <img
                src={ulist.Photo}
                alt="user"
                className="w-24 rounded-tl-lg rounded-bl-lg object-cover"
                onClick={() => {
                  showNew(true);
                }}
              />
              <div className="min-w-[150px]">
                <div className="font-bold inline ">{ulist.Name}</div>
                <div className="cutoff-text">{ulist.Bio}</div>
              </div>

              <div className="font-semibold text-zinc-100 bg-blue-400 rounded-lg p-2 cursor-pointer hover:scale-105 transition all ease-linear">
                Follow
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default UserList;
