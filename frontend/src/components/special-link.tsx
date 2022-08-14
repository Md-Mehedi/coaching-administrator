import { Grid, Link } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function SpecialLink(props) {
  const navigate = useNavigate();
  return (
    <Link
      underline={props.disableUnderline ? "none" : "hover"}
      onClick={(event) => {
        navigate(props.href);
        props.onClick && props.onClick(event);
        event.preventDefault();
      }}
      {...props}
    >
      {props.children}
    </Link>
  );
}
