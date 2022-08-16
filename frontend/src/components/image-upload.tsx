import { Grid, Avatar, Button, ImageList, ImageListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileUpload from "react-material-file-upload";
import AddDialog from "./add-dialog";
import FileUploader from "./file-uploader";

type ImageUploadProps = {
  file?: File;
  onChange: (file: File) => void;
  uploadButtonText: string;
};
export default function ImageUpload(props: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    props.file && setFiles([props.file]);
  }, []);

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <img
          height={150}
          src={
            props.file?.name
              ? window.URL.createObjectURL(props.file as File)
              : "data:image/jpeg;base64," + props.file
          }
        />
      </Grid>
      <Grid item>
        <FileUploader
          uploadButtonText={props.uploadButtonText}
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
