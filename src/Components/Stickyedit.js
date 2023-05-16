import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateSticky, destroySticky } from "../store";
import Sticky from "./Sticky";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

const StickyEdit = () => {
  const { stickies } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const sticky = stickies.find((sticky) => sticky.id === id);

  const [title, setTitle] = useState("");
  const [emojiString, setEmojiString] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("gold");
  const [font, setFont] = useState("verdana");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    const sticky = stickies.find((sticky) => sticky.id === id);
    if (sticky) {
      setTitle(sticky.title);
      setEmojiString(sticky.emojiString);
      setText(sticky.text);
      setColor(sticky.color);
      setFont(sticky.font);
      setIsPublic(!!sticky.isPublic ? true : false);
    }
  }, [stickies]);

  const update = async (ev) => {
    ev.preventDefault();
    try {
      const updated = { id, title, text, color, font, isPublic, emojiString };
      await dispatch(updateSticky(updated));
      navigate("/mystickies");
    } catch (ex) {
      console.log(ex);
    }
  };

  const destroy = (sticky) => {
    dispatch(destroySticky(sticky));
    navigate("/mystickies");
  };

  const reset = () => {
    setTitle(sticky.title);
    setEmojiString(sticky.emojiString);
    setText(sticky.text);
    setColor(sticky.color);
    setFont(sticky.font);
    setIsPublic(!!sticky.isPublic ? true : false);
  };

  if (!sticky) {
    return null;
  }

  return (
    <div className="stickyAndForm">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <h3>edit sticky</h3>
        <label>
          change title
          <TextField
            sx={{ margin: "10px" }}
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </label>
        <label>
          change emoji
          <TextField
            sx={{ margin: "10px" }}
            value={emojiString || ""}
            onChange={(ev) => setEmojiString(ev.target.value)}
          />
        </label>
        <label>
          change text
          <TextField
            sx={{ margin: "10px" }}
            multiline
            value={text}
            onChange={(ev) => setText(ev.target.value)}
          />
        </label>
        <label>
          change color
          <Select
            value={color}
            onChange={(ev) => setColor(ev.target.value)}
            sx={{ margin: "10px" }}
          >
            <MenuItem value="indianRed">red</MenuItem>
            <MenuItem value="orange">orange</MenuItem>
            <MenuItem value="gold">gold</MenuItem>
            <MenuItem value="seagreen">green</MenuItem>
            <MenuItem value="teal">teal</MenuItem>
            <MenuItem value="dodgerBlue">blue</MenuItem>
            <MenuItem value="mediumpurple">purple</MenuItem>
            <MenuItem value="pink">pink</MenuItem>
            <MenuItem value="silver">silver</MenuItem>
          </Select>
        </label>
        <label>
          change font
          <Select
            value={font}
            onChange={(ev) => setFont(ev.target.value)}
            sx={{ margin: "10px" }}
          >
            <MenuItem value="verdana">verdana</MenuItem>
            <MenuItem value="arial">arial</MenuItem>
            <MenuItem value="times new roman">times new roman</MenuItem>
            <MenuItem value="fantasy">fantasy</MenuItem>
            <MenuItem value="monospace">monospace</MenuItem>
          </Select>
        </label>
        <label>
          public?
          <Checkbox
            color="secondary"
            value={isPublic}
            checked={!!isPublic ? true : false}
            onChange={(ev) => setIsPublic(!isPublic)}
          />
        </label>
        <div className="buttons">
          <Button onClick={update} color="secondary">
            update
          </Button>
          <Button onClick={reset} color="secondary">
            reset
          </Button>
          <Button onClick={() => destroy(sticky)} color="secondary">
            delete
          </Button>
        </div>
      </Box>
      <Sticky
        title={title}
        text={text}
        emojiString={emojiString}
        color={color}
        font={font}
        isPublic={isPublic}
      />
    </div>
  );
};

export default StickyEdit;
