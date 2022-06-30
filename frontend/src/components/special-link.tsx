import { Grid, Link } from "@mui/material";
import React, { useContext } from "react";
import { LinkContext } from "./../hooks/use-browse-history";

export default function SpecialLink(props) {
  const [currentLink, updateLink] = useContext(LinkContext);
  const { children, onClick, ...other } = props;
  return (
    <Link
      underline="hover"
      onClick={(event) => {
        onClick && onClick(event);
        updateLink(props.href);
        window.history.pushState("", "", props.href);
        event.preventDefault();
      }}
      {...other}
    >
      {children}
    </Link>
  );
}
