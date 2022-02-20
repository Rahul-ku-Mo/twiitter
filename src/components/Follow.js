import { React, useState, useLayoutEffect } from "react";
import logo from "../Icons/logo.png";
import {
  collection,
  doc,
  query,
  updateDoc,
  where,
  setDoc,
  addDoc,
  getDocs,
  snapshotEqual,
} from "firebase/firestore";
import { db } from "../Firebase";


const Follow = ({ followers = [], ShowNew, user, Id }) => {
  const [followlist, setFollowList] = useState([]);

  const userFollowingRef = collection(
    db,
    "following",
    user.uid,
    "userFollowing"
  );

  const add = async (us_id) => {
    await setDoc(doc(db, "following", user.uid, "userFollowing", us_id), {});
  };

  const idPresent = (IDs, users) => {
    if (users) return followlist.includes(IDs);
  };

  useLayoutEffect(() => {
    const find = async () => {
      const data = await getDocs(userFollowingRef);
      setFollowList(data.docs.map((doc) => doc.id));
    };
    find();
    console.log(followlist);
 
    
  }, []);

  return (
    <>
      {/* <div className="text-slate-200 font-serif mx-4 text-xl my-3 font-extrabold">
        Who to follow
      </div> */}
      <div className="flex flex-col">
        {followers.map((toFollow) => {
          if (toFollow.UserId !== user.uid) {
            return (
              <div key={toFollow.UserId} className="flex">
                <img
                  src={logo}
                  className="w-24 hover:scale-110 cursor-pointer"
                  onClick={() => {
                    if (idPresent(toFollow.UserId, followlist)) {
                      ShowNew(true);
                      Id(toFollow.UserId);
                    } else {
                      console.log("clicked but not followed");
                    }
                  }}
                />
                <div className="container flex flex-col justify-center">
                  <div className="text-md text-slate-500 mx-4">
                    {toFollow.Name}
                  </div>
                  <div className="text-sm text-slate-100 mx-4 lowercase">
                    @{toFollow.Name}
                  </div>
                </div>
                <div
                  className="bg-sky-500 rounded-3xl px-3 py-2  font-bold text-slate-100 float-right h-fit self-center m-4 cursor-pointer transition duration-300 ease-in-out hover:scale-110 "
                  onClick={() => {
                    add(toFollow.UserId);

                    console.log(idPresent(toFollow.UserId, followlist));

                    //we need to choose one user using array method and also in that user we need to push our id in his follolist so that we can access from the aboive image click
                  }}
                >
                  {idPresent(toFollow.UserId,followlist)
                    ? "following"
                    : "follow"}
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
