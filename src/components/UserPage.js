import { React, useState, useEffect } from "react";
import logo from "../Icons/logo.png";
import { db, auth } from "../Firebase";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { updateProfile, signOut, updatePassword, getAuth } from "firebase/auth";
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
  const [usersLoad, setUsersLoad] = useState(false);

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

  //Updating Profile
  const updateDetails = () => {
    personalData.forEach((profile) => {
      if (user.uid === profile.UserId) {
        updateProfile(user, {
          displayName: profile.Name,
          email: profile.Email,
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
      });
    } catch (err) {
      console.log(err);
    }
  };

  //update Database
  const updateDatabase = async (id) => {
    const userDoc = doc(db, "userDetails", id);
    await updateDoc(userDoc, {
      Name: name,
      Phone: phone,
    });
  };

  useEffect(() => {
    const fetchDB = async () => {
      const data = await getDocs(userCollectionRef);

      setPersonalData(
        data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
      );
    };
    fetchDB();
    
  }, []);

  return (
    <div className="ui raised very padded text two column grid container segment ">
      <div className="ui form column font-serif">
        <div className="font-serif text-xl font-bold">Update Profile</div>
        <div className="field">
          <label>Profile Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label>Phone Number</label>
          <input type="number" onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="field">
          <label>Image URL</label>
          <input type="url" onChange={(e) => setPhoto(e.target.value)} />
        </div>

        <div className="field">
          <div
            className="ui button secondary"
            onClick={() => {
              updateDetails();
              addToDb();
              setShow(true);
            }}
          >
            Add
          </div>
          <div
            className="ui button primary"
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
            className="ui button negative"
          >
            Sign Out
          </Link>
          <Link to="/Feeds" className="ui button warning">
            Go to Home
          </Link>
          <div className="ui form column">
            <div className="ui header" onClick={() => setShow(true)}>
              Change Password ?
            </div>
            {show && <div className="ui column">{resetPassword()}</div>}
          </div>
        </div>
      </div>
      <div className="ui form column font-serif">
            <div className="font-xl font-bold ">
                Personal Details
            </div>
            <div className="container mt-4">
            {personalData.map((profile) => {
              if (profile.UserId === user.uid) {
                return (
                  <div>
                    <img src={user.photoURL} alt="Person Name"/>
                    <p className="font-serif font-semibold capitalize my-4" id={profile.Userid}>
                      Name : {profile.Name}
                    </p>
                    <p className="font-serif font-semibold my-4" id={profile.Userid}>
                     PhoneNumber: {profile.Phone}
                    </p>
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
