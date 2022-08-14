import React from "react";
import MobileLayout from "../../layouts/mobile";
import { Typography } from "@mui/material";

function AdminHome() {
  return (
    <div className="App">
      <MobileLayout title="Home">
        <Typography>Coaching Administrator !!!</Typography>
      </MobileLayout>
    </div>
  );
}

export default AdminHome;
