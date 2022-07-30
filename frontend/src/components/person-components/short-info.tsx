import { Grid, Avatar, Typography } from "@mui/material";
import React, { useState } from "react";
import UpdateDeleteButtons from "../update-delete-buttons";
import { Person } from "./../../classes/person-info";
import { Field } from "./about";

export default function ShortInfo({
  person,
  deleteLoading,
  onUpdateClick,
  onDeleteClick,
}: {
  person?: Person;
  deleteLoading?: boolean;
  onUpdateClick?: () => void;
  onDeleteClick?: () => void;
}) {
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={7}>
        <Grid container direction="row" spacing={2} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 200, height: 200 }} />
          </Grid>
          <Grid item>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="body1">{person?.fullName} </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">{person?.nickName}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {person?.contacts?.map((item) => (
                    <Field
                      field="Personal number"
                      value={
                        item.contactType?.name == "Personal" ? item.number : ""
                      }
                    />
                  ))}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={5}>
        <UpdateDeleteButtons
          deleteLoading={deleteLoading}
          onUpdateClick={onUpdateClick}
          onDeleteClick={onDeleteClick}
        />
      </Grid>
    </Grid>
  );
}
