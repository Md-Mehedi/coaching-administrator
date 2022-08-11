import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { showSnackbar } from "../tools/helper-functions";
import { useSnackbar } from "notistack";
import { USER_LINKS } from "../links";
import AuthService from "./../services/auth-service";

export default function Filter({ children }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    if (!AuthService.getAdmin()) {
      enqueueSnackbar("Please login or register", {
        variant: "error",
      });
      navigate(USER_LINKS.login.path);
      return;
    }
    if (!AuthService.getCoachingId()) {
      enqueueSnackbar("Please provide coaching information", {
        variant: "error",
      });
    }
    if (
      !AuthService.getAdmin()?.person?.fullName ||
      AuthService.getAdmin()?.person?.fullName == ""
    ) {
      enqueueSnackbar("Please provide your information", { variant: "error" });
    }
    if (
      !AuthService.getCoachingId() ||
      AuthService.getAdmin()?.person?.fullName == ""
    ) {
      navigate(USER_LINKS.adminCoachingInput.path);
    }
  }, [children]);

  return <>{children}</>;
}
