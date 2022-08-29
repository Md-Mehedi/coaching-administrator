import { red } from "@mui/material/colors";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

export const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    // primary: {
    //   main: "#ff0000",
    // },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          width: "100%",
          backgroundColor: "#2F4B60",
          color: "#ECC991",
        },
      },
      defaultProps: {
        sx: {},
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: "#2F4B60",
          color: "#ECC991",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#2F4B60",
          color: "#ECC991",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: "none",
        },
      },
    },
    // MuiCardContent: {
    //   defaultProps: {
    //     sx: {
    //       backgroundColor: "#2F4B60",
    //       color: "#ECC991",
    //     },
    //   },
    // },
  },
});
export const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
  },
});
// const themeOptions: ThemeOptions = {
//   palette: {
//     type: "light",
//     primary: {
//       main: "#2639a0",
//     },
//     secondary: {
//       main: "#f50057",
//     },
//   },
//   overrides: {
//     MuiButton: {
//       root: {
//         background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//         border: 0,
//         borderRadius: 3,
//         boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//         color: "white",
//         height: 48,
//         padding: "0 30px",
//       },
//     },
//     MuiCard: {
//       root: {
//         background: "#ff00ff",
//       },
//     },
//   },
//   typography: {
//     fontWeightBold: 700,
//   },
// };

const o = {
  overrides: {
    // @ts-ignore
    ...lightTheme.overrides,
    MTableHeader: {
      header: {
        backgroundColor: "#000",
        color: "#fff",
      },
    },
    MUIRichTextEditor: {
      placeHolder: {
        position: "relative",
      },
      root: {
        padding: "2px 10px",
        width: "100%",
        minHeight: 100,
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
};

Object.assign(lightTheme, o);
Object.assign(darkTheme, o);
