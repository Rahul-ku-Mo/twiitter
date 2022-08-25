import { React, useState, useEffect } from "react";
import logo from "../Icons/logo.png";
import "./UersPage.css";
import { db, auth } from "../Firebase";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { updateProfile, signOut, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UserPage = () => {
  const user = auth.currentUser;
  const userCollectionRef = collection(db, "userDetails");

  const [personalData, setPersonalData] = useState([]);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [photo, setPhoto] = useState(logo);
  const [bio, setBio] = useState("Tell me about yourself....");

  const [usersLoad, setUsersLoad] = useState(false);
  const [photoBg, setPhotoBg] = useState("");

  //change Password
  const changePassword = async () => {
    try {
      await updatePassword(user, password);
      toast.success("password updated successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  //reset Password
  const resetPassword = () => {
    return (
      <div className="ui field" style={{ marginTop: "10px" }}>
        <div className="ui input">
          <input
            type="text"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="ui button primary" onClick={changePassword}>
          Update
        </div>
      </div>
    );
  };

  //Signing Out User
  const signedOutUser = async () => {
    try {
      await signOut(auth);
      console.log(user);
      toast.success("Signed out successfully");
    } catch (err) {
      toast.error("Failed to sign out");
      console.log(err);
    }
  };

  //Updating Profile in auth
  const updateDetails = () => {
    personalData.forEach((profile) => {
      if (user.uid === profile.UserId) {
        updateProfile(user, {
          displayName: profile.Name,
          photoURL: profile.Photo,
          phone: profile.Phone,
        })
          .then(() => {
            console.log("working");
            setUsersLoad(true);
            toast.success("Profile updated successfully");
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };
  //search id
  const searchId = () => {
    personalData.forEach((prof) => {
      if (prof.UserId === user.uid) return setId(prof.docId);
    });

    return id;
  };

  //add to fireStore database
  const addToDb = async () => {
    try {
      await addDoc(userCollectionRef, {
        Name: name,
        Phone: phone,
        UserId: user.uid,
        Photo: photo,
        PhotoBG: photoBg,
        Bio: bio,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //update firestore Database
  const updateDatabase = async (id) => {
    const userDoc = doc(db, "userDetails", id);
    await updateDoc(userDoc, {
      Name: name,
      Phone: phone,
      Bio: bio,
    });
  };

  useEffect(() => {
    //fetch firestore database
    const fetchDB = async () => {
      const data = await getDocs(userCollectionRef);

      setPersonalData(
        data.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
          Followers: 22,
          Following: 14,
          BG: "https://i.picsum.photos/id/1015/6000/4000.jpg?hmac=aHjb0fRa1t14DTIEBcoC14c5rAXOSwnVlaA5ujxPQ0I",
        }))
      );
    };

    // const createCollection = async () => {
    //   await setDoc(doc(db, "following", user.uid), {});

    //   console.log("happening");
    // };

    fetchDB();
    // createCollection();
  }, []);

  return (
    <div className="user-container ">
      <div className="user-left p-10">
        <div className=" text-xl font-bold">Update Profile</div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          autoComplete="off"
          style={{
            height: "46px",
            width: "295px",
            fontFamily: "'Poppins', sans-serif",
            margin: "30px 0px",
            boxShadow: "0px 4.00498px 50.0622px rgba(79, 67, 67, 0.15)",
            fontSize: "14px",
            padding: "21px 14px",
          }}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Tell me about yourself...."
          style={{
            height: "100px",
            width: "295px",
            fontFamily: "'Poppins', sans-serif",
            margin: "0px 0px 30px 0px",
            boxShadow: "0px 4.00498px 50.0622px rgba(79, 67, 67, 0.15)",
            fontSize: "14px",
            padding: "21px 14px",
          }}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          placeholder="Phone"
          value={phone}
          autoComplete="off"
          style={{
            height: "46px",
            width: "295px",
            marginBottom: "30px",
            fontFamily: "'Poppins', sans-serif",
            boxShadow: "0px 4.00498px 50.0622px rgba(79, 67, 67, 0.15)",
            fontSize: "14px",
            padding: "21px 14px",
          }}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          placeholder="Image Url"
          autoComplete="off"
          style={{
            height: "46px",
            width: "295px",
            fontFamily: "'Poppins', sans-serif",
            marginBottom: "30px",
            boxShadow: "0px 4.00498px 50.0622px rgba(79, 67, 67, 0.15)",
            fontSize: "14px",
            padding: "21px 14px",
          }}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <input
          placeholder="Background Url"
          autoComplete="off"
          style={{
            height: "46px",
            width: "295px",
            fontFamily: "'Poppins', sans-serif",
            marginBottom: "30px",
            boxShadow: "0px 4.00498px 50.0622px rgba(79, 67, 67, 0.15)",
            fontSize: "14px",
            padding: "21px 14px",
          }}
          onChange={(e) => setPhotoBg(e.target.value)}
        />

        <div className="user-buttons">
          <div
            className=" bg-blue-800 text-slate-100 user-btn"
            onClick={() => {
              updateDetails();
              addToDb();
              setShow(true);
            }}
          >
            Add
          </div>
          <div
            className=" bg-blue-500 text-slate-100 user-btn"
            onClick={() => {
              updateDetails();
              updateDatabase(searchId);
            }}
          >
            Update
          </div>
          <Link
            to="/userLogin"
            onClick={signedOutUser}
            className=" bg-blue-200 text-slate-100 user-btn"
          >
            Sign Out
          </Link>
        </div>
        <div className="py-6">
          <div
            className="text-xl font-bold text-slate-800"
            onClick={() => setShow(true)}
          >
            Change Password ?
          </div>
          {show && <div className="ui column">{resetPassword()}</div>}
        </div>
      </div>
      <div className="user-right p-10">
        <div className="text-xl font-bold ">Profile</div>
        <div className="container mt-4 p-2">
          {personalData.map((profile) => {
            if (profile.UserId === user.uid) {
              return (
                <div className="user-profile">
                  <img
                    src={user.photoURL}
                    className="rounded-full "
                    alt="Person Name"
                  />
                  <p
                    className="text-4xl font-black capitalize my-2 pl-8"
                    id={profile.Userid}
                  >
                    {profile.Name}
                  </p>
                  <p
                    className="w-[18rem] indent-8 text-justify text-slate-500 text-lg font-[600] my-4"
                    id={profile.Userid}
                  >
                    {profile.Bio}
                  </p>  
                  <Link to="/Feeds" className="user-btn text-slate-100 bg-zinc-500  ">
                    Go to Home
                  </Link>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
