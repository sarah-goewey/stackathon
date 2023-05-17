import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import emoji from "node-emoji";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sticky = ({
  id,
  title,
  text,
  emojiString,
  color,
  font,
  isPublic,
  wantLink,
  userId,
}) => {
  const { users } = useSelector((state) => state);
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return null;
  }

  return (
    <Card
      sx={{
        width: 345,
        height: 345,
        margin: "5px",
        position: "relative",
      }}
      variant="outlined"
      style={{
        backgroundColor: color,
        fontFamily: font,
      }}
    >
      <CardContent>
        <p>
          {title}
          {!!emojiString && emoji.get(emojiString)}
        </p>
        <p style={{ fontSize: "0.75rem" }}>by {user.username || "anonymous"}</p>
        <hr />
        <br />
        <p>{text}</p>
        {!!isPublic ? (
          <p
            style={{
              position: "absolute",
              bottom: "0px",
              left: "0px",
              margin: "0",
              fontSize: "0.75rem",
            }}
          >
            public
          </p>
        ) : (
          <p
            style={{
              position: "absolute",
              bottom: "0px",
              left: "0px",
              margin: "0",
              fontSize: "0.75rem",
            }}
          >
            private
          </p>
        )}
        {!!wantLink && (
          <Link
            to={`/stickies/${id}`}
            style={{
              position: "absolute",
              bottom: "0px",
              right: "0px",
              fontSize: "0.75rem",
            }}
          >
            edit this sticky
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default Sticky;
