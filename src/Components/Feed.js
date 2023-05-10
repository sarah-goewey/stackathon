import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Feed = () => {
  const { auth, stickies } = useSelector((state) => state);
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
          <Card
            sx={{ maxWidth: 345 }}
            key={sticky.id || idx}
            variant="outlined"
            style={{ backgroundColor: sticky.color, fontFamily: sticky.font }}
          >
            <CardContent>
              {sticky.title}
              <hr />
              <br />
              {sticky.text}
            </CardContent>
          </Card>
        );
      })}
    </ul>
  );
};

export default Feed;
