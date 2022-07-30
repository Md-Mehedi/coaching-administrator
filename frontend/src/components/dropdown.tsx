import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteValue,
} from "@mui/material";
import { useEffect, useState } from "react";

// export type DropDownProps = {
//   label: string;
//   value: any;
//   data: { value: any; label: string }[];
// };

// export default function DropDown(props) {
//   const { data, ...others } = props;
//   return (
//     <FormControl fullWidth>
//       <InputLabel>{props.label}</InputLabel>
//       <Select {...others}>
//         {data.map((item, index) => (
//           <MenuItem value={item.value}>{item.label}</MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }
//@ts-ignore
export interface DropDownProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = true
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  label: string;
  optionLabel: string;
  required?: boolean;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}
export default function DropDown<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(props: DropDownProps<T, Multiple, DisableClearable, FreeSolo>) {
  const { label, optionLabel, required, ...others } = props;
  const [state, setState] = useState<{
    inputValue: string;
    selectedValue:
      | AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
      | undefined;
  }>({
    inputValue: "",
    selectedValue: props.value,
  });
  let localSelectedValue: any = null;
  useEffect(() => {
    // setSelectedValue(props.value);
  }, []);
  return (
    <Autocomplete
      blurOnSelect={true}
      autoHighlight
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            // props.onClick && props.onClick(event);
          }}
          fullWidth
          label={props.label}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
      {...others}
      //@ts-ignore
      value={props.value || null}
      //@ts-ignore
      defaultValue={props.value || null}
      onChange={(event, newVal, reason) => {
        // props.onChange && props.onChange(event, newVal, reason);
        localSelectedValue = newVal;
        // setState({ ...state, selectedValue: newVal });
        //  setSelectedValue(newVal);
      }}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        props.onClick && props.onClick(event);
      }}
      inputValue={
        state.inputValue
        // selectedValue && props.optionLabel
        //   ? selectedValue[props.optionLabel]
        //   : selectedValue
      }
      onInputChange={(event, value, reject) => {
        // let object = props.optionLabel
        //   ? JSON.parse(`{"${props.optionLabel}":"${value}"}`)
        //   : value;
        // setSelectedValue(object);
        setState({ ...state, inputValue: value });
      }}
      // onHighlightChange={(event, value) => {
      //   value && props.optionLabel
      //     ? setSelectedValue(value[props.optionLabel])
      //     : // @ts-ignore
      //       setSelectedValue(value);
      // }}
      onClose={(event) => {
        if (!localSelectedValue) {
          // if (state.inputValue == "") return;
          let val = props.options.find((item) => {
            if (props.optionLabel) {
              return state.inputValue == item[props.optionLabel];
            } else {
              //@ts-ignore
              return state.inputValue == item;
            }
          });
          if (!val) {
            val = props.optionLabel
              ? JSON.parse(`{"${props.optionLabel}":"${state.inputValue}"}`)
              : state.inputValue;
          }
          props.onChange &&
            // @ts-ignore
            props.onChange(event, val, "createOption");
          // @ts-ignore
          setState({ ...state, selectedValue: val });
        } else {
          props.onChange &&
            // @ts-ignore
            props.onChange(event, localSelectedValue, "createOption");
          setState({ ...state, selectedValue: localSelectedValue });
        }
        // if (selectedValue) {
        //   props.onChange &&
        //   return;
        // }
        // let foundObject = props.options.find((item) => {
        //   if (props.optionLabel && item[props.optionLabel] == currentValue)
        //     return true;
        //   // @ts-ignore
        //   else if (!props.optionLabel && item == currentValue) return true;
        //   return false;
        // });
        // if (props.onChange) {
        //   if (foundObject) {
        //     // @ts-ignore
        //     props.onChange(event, foundObject, "createOption");
        //   } else {
        //     let object = props.optionLabel
        //       ? JSON.parse(`{"${props.optionLabel}":"${currentValue}"}`)
        //       : currentValue;
        //     props.onChange(event, object, "createOption");
        //   }
        // }
      }}
      componentsProps={{
        paper: {
          onClick: (event) => {
            event.preventDefault();
            event.stopPropagation();
          },
        },
      }}
      // @ts-ignore
      getOptionLabel={(option: T) =>
        props.optionLabel ? option[props.optionLabel] : option
      }
    />
  );
}

// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Autocomplete,
//   TextField,
//   AutocompleteProps,
// } from "@mui/material";

// export interface DropDownData {
//   value: any;
//   label: string;
// }
// export interface DropDownProps<
//   T,
//   Multiple extends boolean | undefined = undefined,
//   DisableClearable extends boolean | undefined = undefined,
//   FreeSolo extends boolean | undefined = undefined
// > extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
//   label: string;
//   value: any;
//   data: T[];
// }

// export default function DropDown<
//   T,
//   Multiple extends boolean | undefined = undefined,
//   DisableClearable extends boolean | undefined = undefined,
//   FreeSolo extends boolean | undefined = undefined
// >(props: DropDownProps<T, Multiple, DisableClearable, FreeSolo>) {
//   const { data, label, ...others } = props;
//   console.log(data);
//   return (
//     <Autocomplete
//       {...others}
//       options={data}
//       autoHighlight
//       getOptionLabel={(option) =>
//         // @ts-ignore
//         option.label
//       }
//       // renderOption={(props, option) => (
//       //   <Box
//       //     component="li"
//       //     sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
//       //     {...props}
//       //   >
//       //     {/* <img
//       //     loading="lazy"
//       //     width="20"
//       //     src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
//       //     srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
//       //     alt=""
//       //   /> */}
//       //     {option.id} - {option.name}
//       //   </Box>
//       // )}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           fullWidth
//           label={label}
//           inputProps={{
//             ...params.inputProps,
//             autoComplete: "new-password", // disable autocomplete and autofill
//           }}
//         />
//       )}
//     />
//   );
//   // return (
//   //   <FormControl fullWidth>
//   //     <InputLabel>{props.label}</InputLabel>
//   //     <Select {...others}>
//   //       {data.map((item, index) => (
//   //         <MenuItem value={item.value}>{item.label}</MenuItem>
//   //       ))}
//   //     </Select>
//   //   </FormControl>
//   // );
// }
