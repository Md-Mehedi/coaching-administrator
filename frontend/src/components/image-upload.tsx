import { Grid, Avatar, Button, ImageList, ImageListItem } from "@mui/material";
import React, { useState } from "react";
import FileUpload from "react-material-file-upload";
import AddDialog from "./add-dialog";
import FileUploader from "./file-uploader";

export default function ImageUpload(props) {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <img
          height={150}
          src={files.length > 0 ? window.URL.createObjectURL(files[0]) : ""}
        />
      </Grid>
      <Grid item>
        <FileUploader
          uploadButtonText={props.uploadButtonText}
          maxFiles={1}
          value={files}
          onChange={(files) => {
            setFiles(files);
            props.onChange && props.onChange(files);
          }}
        />
      </Grid>
    </Grid>
  );
}
