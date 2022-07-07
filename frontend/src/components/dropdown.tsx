import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export type DropDownProps = {
  label: string;
  value: any;
  data: { value: any; label: string }[];
};

export default function DropDown(props: DropDownProps) {
  const { data, ...others } = props;
  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <Select {...others}>
        {data.map((item, index) => (
          <MenuItem value={item.value}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
