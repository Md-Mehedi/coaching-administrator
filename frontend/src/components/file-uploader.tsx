import { DeleteForever } from "@mui/icons-material";
import { Box, Grid, IconButton, ImageList, ImageListItem } from "@mui/material";
import React, { useState } from "react";
import FileUpload, { FileUploadProps } from "react-material-file-upload";
import AddDialog, { AddDialogProps } from "./add-dialog";

export interface FileUploaderProps extends FileUploadProps {
  uploadButtonText: string;
}

export default function FileUploader(props: FileUploaderProps) {
  const [state, setState] = useState<{ files: File[] }>({
    files: [],
  });
  function updateState(object) {
    setState({ ...state, ...object });
  }
  return (
    <AddDialog
      button={{ buttonLabel: props.uploadButtonText, icon: <></> }}
      saveButtonClick={(event) => props.onChange && props.onChange(state.files)}
    >
      <Grid container direction="column" spacing={2}>
        {state.files.length > 0 && (
          <ImageList gap={8} cols={3}>
            {state.files.map((file, index) => (
              <ImageListItem key={index} sx={{ alignItems: "end" }}>
                <img
                  loading="lazy"
                  // width={150}
                  // height={110}
                  //@ts-ignore
                  src={window.URL.createObjectURL(file)}
                />
                <IconButton
                  sx={{ position: "absolute" }}
                  onClick={(event) => {
                    var currentFiles = state.files.filter(
                      (file, idx) => idx != index
                    );
                    updateState({ files: currentFiles });
                  }}
                >
                  <DeleteForever />
                </IconButton>
              </ImageListItem>
            ))}
          </ImageList>
        )}
        <Grid item>
          <FileUpload
            buttonText={state.files.length > 0 ? "Change" : "Upload"}
            // accept={["image/png", "image/jpg", "image/jpeg"]}
            {...props}
            sx={{ ...props.sx, border: 0 }}
            value={state.files}
            onChange={(files) => updateState({ files: files })}
          />
        </Grid>
      </Grid>
    </AddDialog>
  );
}
