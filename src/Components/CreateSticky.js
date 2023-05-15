import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSticky } from "../store";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Sticky from "./Sticky";

const CreateSticky = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/mystickies");
    } catch (ex) {
      console.log(ex);
    }
  };

  const reset = () => {
    setTitle("title goes here");
    setEmojiString("");
    setText("text goes here");
    setColor("gold");
    setFont("verdana");
    setIsPublic(false);
  };

  return (
    <div>
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
          <div className="buttons">
            <Button onClick={create} color="secondary">
              create
            </Button>
            <Button onClick={reset} color="secondary">
              reset
            </Button>
          </div>
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
    </div>
  );
};

export default CreateSticky;
