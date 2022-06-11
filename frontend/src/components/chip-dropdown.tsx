import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { Theme } from "@mui/system";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1, 0),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: "100%",
  },
  // heading: {
  //   fontSize: theme.typography.pxToRem(15),
  //   flexBasis: "33.33%",
  //   flexShrink: 0,
  // },
  // secondaryHeading: {
  //   fontSize: theme.typography.pxToRem(15),
  //   color: theme.palette.text.secondary,
  // },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function getStyles(id, data, theme) {
  return {
    fontWeight: data.some((item) => item == id)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type ChipDropdownProps = {
  label: string;
  data: {
    id: number;
    name: string;
  }[];
  onSelectedDataChange?: () => void;
};

type ChipDropdownStates = {
  value: number[];
};

export default function ChipDropdown(props: ChipDropdownProps) {
  const [state, setState] = useState<ChipDropdownStates>({
    value: [],
  });
  const classes = useStyles();
  const theme: Theme = useTheme();
  function onValueChange(event) {
    setState({
      ...state.value,
      value: event.target.value,
    });
    props.onSelectedDataChange && props.onSelectedDataChange();
  }
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        label={props.label}
        multiple
        value={state.value}
        onChange={onValueChange}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((id) => (
              <Chip
                key={id}
                label={props.data.filter((item) => item.id == id)[0]?.name}
                className={classes.chip}
              />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {props.data.map((item) => {
          // @ts-ignore
          return (
            <MenuItem
              key={item.id}
              value={item.id}
              style={{
                fontWeight: state.value.some((i) => i == item.id)
                  ? // @ts-ignore
                    theme.typography.fontWeightMedium
                  : // @ts-ignore
                    theme.typography.fontWeightRegular,
              }}
            >
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

// export function LanguageField({
//   objects,
//   onObjectsChange = (languages) => console.log(languages),
// }) {
//   const [languageItem, setLanguageItem] = useState([]);
//   const classes = useStyles();
//   const theme = useTheme();
//   const [languages, setLanguages] = useState([]);
//   const onLanguagesChange = (event) => {
//     setLanguages(event.target.value);
//     onObjectsChange(
//       event.target.value.map((item) =>
//         languageItem.find((langItem) => langItem.id == item)
//       )
//     );
//   };

//   return (

//   );
// }
