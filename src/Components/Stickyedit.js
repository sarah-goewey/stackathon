import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useParams, useNavigate } from "react-router-dom";
import { updateSticky, destroySticky } from "../store";
import emoji from "node-emoji";

const StickyEdit = () => {
  const { auth, stickies } = useSelector((state) => state);
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
    <div>
      <form onSubmit={update}>
        <h2>edit sticky</h2>
        <label>
          change title
          <input value={title} onChange={(ev) => setTitle(ev.target.value)} />
        </label>
        <label>
          change or add title emoji
          <input
            value={emojiString || ""}
            onChange={(ev) => setEmojiString(ev.target.value)}
          />
        </label>
        <label>
          change text
          <textarea value={text} onChange={(ev) => setText(ev.target.value)} />
        </label>
        <label>
          change color
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
          change font
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
            checked={!!isPublic ? true : false}
            onChange={(ev) => setIsPublic(!isPublic)}
          />
        </label>
        <button>update sticky</button>
        <button onClick={reset}>reset</button>
      </form>
      <Card
        sx={{ width: 345, minHeight: 345 }}
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
          <button onClick={() => destroy(sticky)}>delete</button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StickyEdit;
