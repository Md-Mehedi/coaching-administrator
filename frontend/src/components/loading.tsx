import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

export default function Loading({
  loading,
  children,
}: {
  loading: boolean;
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <>
      {loading ? (
        <Backdrop
          open={loading}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress />
        </Backdrop>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
