import { AppBar, Grid } from "@mui/material";
import React from "react";
import { CONFIG } from "./../Config";

class MobileLayoutProps {
  title: string = "";
  children?: JSX.Element = (<></>);
}

function MobileLayout({ title, children }: MobileLayoutProps) {
  return (
    <div style={{ width: CONFIG.WIDTH, backgroundColor: "yellow" }}>
      <AppBar title={title} />
      <Grid>{children}</Grid>
    </div>
  );
}

export default MobileLayout;
