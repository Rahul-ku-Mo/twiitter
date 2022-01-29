import { React, useState } from "react";

const NewUserPage = ({ toFollow = [], thereTweets = [], id }) => {
  return <>{toFollow.map((people) => {
    if(people.UserId === id){
      return (
        <div>
         <p> My name is {people.Name}</p>
         <p> My tweets are:</p>
         
        </div>
      )
    }
  })}</>;
};
export default NewUserPage;
