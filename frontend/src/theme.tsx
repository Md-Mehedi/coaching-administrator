import { red } from "@mui/material/colors";
import { createTheme, Theme } from "@mui/material/styles";

export const lightTheme: Theme = createTheme({
  palette: {
    secondary: {
      main: red[500],
    },
  },
});

Object.assign(lightTheme, {
  overrides: {
    // @ts-ignore
    ...lightTheme.overrides,
    MUIRichTextEditor: {
      placeHolder: {
        position: "relative",
      },
      root: {
        padding: "2px 10px",
        width: "100%",
        minHeight: 200,
      },
      editor: {
        textAlign: "justify",
      },
    },
    MuiDropzonePreviewList: {
      root: {
        justifyContent: "space-around",
      },
      imageContainer: {
        flexBasis: "100%",
        maxWidth: "90%",
      },
      image: {
        height: -1,
      },
      removeButton: {
        top: 0,
        right: 0,
      },
    },
    MuiDropzoneArea: {
      root: {
        minHeight: 0,
      },
      text: {
        textAlign: "center",
        color: "white",
      },
    },
    MuiTypography: {
      root: {
        textAlign: "justify",
      },
    },
    PrivateTabIndicator: {
      root: {
        height: 6,
      },
      vertical: {
        width: 6,
      },
    },
    MuiFormControlLabel: {
      root: {
        margin: "auto",
        marginRight: 0,
      },
    },
    MuiRating: {
      root: {
        color: "#ffc107",
      },
    },

    MuiAvatar: {
      root: {
        border: "2px solid white",
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#5DCDC8",
      },
    },
  },
});
