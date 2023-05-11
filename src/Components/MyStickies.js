import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSticky, destroySticky } from "../store";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import emoji from "node-emoji";

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

  const [title, setTitle] = useState("title goes here");
  const [emojiString, setEmojiString] = useState("");
  const [text, setText] = useState("text goes here");
  const [color, setColor] = useState("gold");
  const [font, setFont] = useState("verdana");
  const [isPublic, setIsPublic] = useState(false);

  const create = async (ev) => {
    ev.preventDefault();
    try {
      const sticky = {
        title,
        text,
        color,
        font,
        isPublic,
        userId: auth.id,
        emojiString,
      };
      await dispatch(createSticky(sticky));
      setTitle("title goes here");
      setEmojiString("");
      setText("text goes here");
      setColor("gold");
      setFont("verdana");
      setIsPublic(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  const destroy = (sticky) => {
    dispatch(destroySticky(sticky));
  };

  return (
    <div>
      <h2>{auth.username}'s stickies</h2>
      <Card
        sx={{ width: 345 }}
        variant="outlined"
        style={{ backgroundColor: color, fontFamily: font }}
      >
        <CardContent>
          {title}
          {emojiString && emoji.get(emojiString)}
          <hr />
          <br />
          {text}
          <br />
        </CardContent>
      </Card>
      <form onSubmit={create}>
        <h3>create a new sticky</h3>
        <label>
          enter title
          <input value={title} onChange={(ev) => setTitle(ev.target.value)} />
        </label>
        <label>
          add emoji to title
          <input
            value={emojiString}
            onChange={(ev) => setEmojiString(ev.target.value)}
          />
        </label>
        <label>
          enter text
          <textarea value={text} onChange={(ev) => setText(ev.target.value)} />
        </label>
        <label>
          select color
          <select value={color} onChange={(ev) => setColor(ev.target.value)}>
            <option value="gold">gold</option>
            <option value="pink">pink</option>
            <option value="dodgerBlue">blue</option>
            <option value="seagreen">green</option>
            <option value="mediumpurple">purple</option>
            <option value="silver">silver</option>
          </select>
        </label>
        <label>
          select font
          <select value={font} onChange={(ev) => setFont(ev.target.value)}>
            <option value="verdana">verdana</option>
            <option value="arial">arial</option>
            <option value="times new roman">times new roman</option>
            <option value="fantasy">fantasy</option>
          </select>
        </label>
        <label>
          public?
          <input
            type="checkbox"
            value={isPublic}
            onClick={(ev) => setIsPublic(!isPublic)}
          />
        </label>
        <button>create sticky</button>
      </form>
      <ul className="stickyFeed">
        {myStickies.map((sticky) => {
          return (
            <Card
              sx={{ width: 345 }}
              key={sticky.id}
              variant="outlined"
              style={{ backgroundColor: sticky.color, fontFamily: sticky.font }}
            >
              <CardContent>
                <Link to={`/stickies/${sticky.id}`}>{sticky.title}</Link>
                {!!sticky.emojiString && emoji.get(sticky.emojiString)}
                <hr />
                <br />
                {sticky.text}
                <br />
                <button onClick={() => destroy(sticky)}>delete</button>
              </CardContent>
            </Card>
          );
        })}
      </ul>
    </div>
  );
};

export default MyStickies;
