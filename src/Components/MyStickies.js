import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSticky, destroySticky } from "../store";
import Sticky from "./Sticky";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

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
      <div className="stickyAndForm">
        <form>
          <h3>create a new sticky</h3>
          <label>
            enter title
            <TextField
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
          </label>
          <label>
            add emoji to title
            <TextField
              value={emojiString}
              onChange={(ev) => setEmojiString(ev.target.value)}
            />
          </label>
          <label>
            enter text
            <TextField
              multiline
              value={text}
              onChange={(ev) => setText(ev.target.value)}
            />
          </label>
          <label>
            select color
            <Select value={color} onChange={(ev) => setColor(ev.target.value)}>
              <MenuItem value="gold">gold</MenuItem>
              <MenuItem value="pink">pink</MenuItem>
              <MenuItem value="dodgerBlue">blue</MenuItem>
              <MenuItem value="seagreen">green</MenuItem>
              <MenuItem value="mediumpurple">purple</MenuItem>
              <MenuItem value="silver">silver</MenuItem>
            </Select>
          </label>
          <label>
            select font
            <Select value={font} onChange={(ev) => setFont(ev.target.value)}>
              <MenuItem value="verdana">verdana</MenuItem>
              <MenuItem value="arial">arial</MenuItem>
              <MenuItem value="times new roman">times new roman</MenuItem>
              <MenuItem value="fantasy">fantasy</MenuItem>
            </Select>
          </label>
          <label>
            public?
            <Checkbox
              color="secondary"
              value={isPublic}
              onClick={(ev) => setIsPublic(!isPublic)}
            />
          </label>
          <Button onClick={create} color="secondary">
            create
          </Button>
        </form>
        <Sticky
          title={title}
          text={text}
          emojiString={emojiString}
          color={color}
          font={font}
          isPublic={isPublic}
        />
      </div>
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
