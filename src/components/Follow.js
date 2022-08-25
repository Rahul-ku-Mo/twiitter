import { React, useState, useLayoutEffect } from "react";
import logo from "../Icons/logo.png";
import { Bounce } from "react-awesome-reveal";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
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
    console.log(followers)
  }, []);

  return (
    <>
      <div className="flex flex-col">
        {followers.map((toFollow) => {
          if (toFollow.UserId !== user.uid) {
            return (
            <Bounce  triggerOnce>
                <div key={toFollow.UserId} className="flex m-2 bg-black rounded-xl">
                <img
                  src={toFollow.Photo}
                  alt="my-bg"
                  className="w-24 cursor-pointer rounded-l-xl"
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
                  <div className="text-xl text-zinc-100 mx-4">
                    {toFollow.Name}
                  </div>
                  <div className="text-sm text-zinc-400 mx-4 lowercase">
                    @{toFollow.Name}
                  </div>
                </div>
                <div
                  className="bg-blue-400 user-btn font-bold text-slate-100 float-right h-fit self-center m-4 cursor-pointer transition duration-300 ease-in-out hover:scale-110 "
                  onClick={() => {
                    add(toFollow.UserId);

                    console.log(idPresent(toFollow.UserId, followlist));

                    //we need to choose one user using array method and also in that user we need to push our id in his follolist so that we can access from the aboive image click
                  }}
                >
                  {idPresent(toFollow.UserId, followlist)
                    ? "following"
                    : "follow"}
                </div>
              </div>
            </Bounce>
            );
          }
        })}
      </div>
    </>
  );
};

export default Follow;
