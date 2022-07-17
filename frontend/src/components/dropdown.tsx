import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  AutocompleteProps,
  AutocompleteRenderInputParams,
} from "@mui/material";

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
  FreeSolo extends boolean | undefined = undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  label: string;
  optionLabel: string;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}
export default function DropDown<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(props: DropDownProps<T, Multiple, DisableClearable, FreeSolo>) {
  const { label, optionLabel, ...others } = props;
  return (
    <Autocomplete
      {...others}
      onChange={(event, newVal, reason) => {
        console.log(event);
        console.log(props.onChange);
        props.onChange && props.onChange(event, newVal, reason);
      }}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        // props.onClick && props.onClick(event);
      }}
      componentsProps={{
        paper: {
          onClick: (event) => {
            event.preventDefault();
            event.stopPropagation();
            // props.onClick && props.onClick(event);
          },
        },
      }}
      autoHighlight
      // @ts-ignore
      getOptionLabel={(option: object) => option[props.optionLabel]}
      renderInput={(params) => (
        <TextField
          {...params}
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
