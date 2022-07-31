import { Grid, Typography } from "@mui/material";
import { convertToRaw } from "draft-js";
import MUIRichTextEditor from "mui-rte";
import React, { useState } from "react";

export default function TextEditor({
  value,
  onChange,
  readOnly = false,
  label,
}: {
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  label?: string;
}) {
  const [content, setContent] = useState(value ? value : "");
  const [key, setKey] = useState(100);
  function handleBodyChange(event) {
    const rteContent = convertToRaw(event.getCurrentContent());
    rteContent.blocks[0].text !== "" && setContent(JSON.stringify(rteContent));
  }
  return (
    <Grid
      container
      sx={{ border: readOnly ? "none" : "1px solid rgba(0, 0, 0, 0.23)" }}
    >
      {label && (
        <Grid item container sx={{ marginLeft: 1 }}>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: "bold",
              color: "rgba(0, 0, 0, 0.87)",
            }}
          >
            {label}
          </Typography>
        </Grid>
      )}
      <Grid item container>
        <MUIRichTextEditor
          toolbar={!readOnly}
          key={key}
          label="Start typing here..."
          defaultValue={value}
          onChange={handleBodyChange}
          readOnly={readOnly}
          onBlur={() => {
            console.log(content);
            if (onChange) onChange(content);
          }}
        />
      </Grid>
    </Grid>
  );
}
