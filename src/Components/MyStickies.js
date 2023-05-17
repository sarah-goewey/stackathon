import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSticky, destroySticky } from "../store";
import Sticky from "./Sticky";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const MyStickies = () => {
  const { auth, stickies } = useSelector((state) => state);
  const dispatch = useDispatch();

  const myStickies = stickies
    .filter((sticky) => sticky.userId === auth.id)
    .sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    });

  const destroy = (sticky) => {
    dispatch(destroySticky(sticky));
  };

  return (
    <div>
      <h2>{auth.username}'s stickies</h2>
      <Link to="/createsticky">create new sticky</Link>
      <ul className="myStickies">
        {myStickies.map((sticky, idx) => {
          return (
            <div className="stickyAndButton" key={sticky.id || idx}>
              <Sticky
                id={sticky.id}
                title={sticky.title}
                text={sticky.text}
                emojiString={sticky.emojiString}
                color={sticky.color}
                font={sticky.font}
                isPublic={sticky.isPublic}
                wantLink={true}
                userId={sticky.userId}
              />
              <Button color="secondary" onClick={() => destroy(sticky)}>
                x
              </Button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default MyStickies;
