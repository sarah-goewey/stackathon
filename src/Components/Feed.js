import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Sticky from "./Sticky";

const Feed = () => {
  const { stickies } = useSelector((state) => state);
  const dispatch = useDispatch();

  const feed = stickies
    .filter((sticky) => !!sticky.isPublic)
    .sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    });

  return (
    <ul className="stickyFeed">
      {feed.map((sticky, idx) => {
        return (
          <Sticky
            key={sticky.id || idx}
            id={sticky.id}
            title={sticky.title}
            text={sticky.text}
            emojiString={sticky.emojiString}
            color={sticky.color}
            font={sticky.font}
            isPublic={sticky.isPublic}
            userId={sticky.userId}
          />
        );
      })}
    </ul>
  );
};

export default Feed;
