import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useParams } from "react-router-dom";

const StickyEdit = () => {
  const { auth, stickies } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  const sticky = stickies.find((sticky) => sticky.id === id);

  if (!sticky) {
    return null;
  }

  return (
    <div>
      <h2>sticky edit {sticky.title}</h2>
    </div>
  );
};

export default StickyEdit;
