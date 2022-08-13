import { Grid, Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileUpload from "react-material-file-upload";
import AddDialog from "./add-dialog";
import FileUploader from "./file-uploader";

type AvatarUploadProps = {
  file?: File;
  onChange: (file: File) => void;
};
export default function AvatarUpload(props: AvatarUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    props.file && setFiles([props.file]);
  }, []);
  console.log("in avatar upload", props.file);
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Avatar
          src={
            props.file?.name
              ? window.URL.createObjectURL(props.file as File)
              : "data:image/jpeg;base64," + props.file
          }
          sx={{ width: 200, height: 200 }}
        />
      </Grid>
      <Grid item>
        <FileUploader
          uploadButtonText="Upload Picture"
          maxFiles={1}
          value={files}
          onChange={(files) => {
            setFiles(files);
            props.onChange && props.onChange(files[0]);
          }}
        />
      </Grid>
    </Grid>
  );
}
