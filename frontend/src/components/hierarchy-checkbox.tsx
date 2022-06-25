// import React from "react";
// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Box,
//   Checkbox,
//   FormControlLabel,
//   Grid,
// } from "@mui/material";

// export default function HierarchyCheckbox(props: HierarchyCheckboxProps) {
//   const [checked, setChecked] = React.useState([true, false]);

//   const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChecked([event.target.checked, event.target.checked]);
//   };

//   const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChecked([event.target.checked, checked[1]]);
//   };

//   const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChecked([checked[0], event.target.checked]);
//   };
//   return (
//     <>
//       {props.data.map((item, idx) => (
//         <Accordion>
//           <AccordionSummary>
//             <Grid container direction="row" alignItems="center" spacing={2}>
//               <Grid item>
//                 <FormControlLabel
//                   label={item.type}
//                   control={
//                     <Checkbox
//                       checked={checked[0] && checked[1]}
//                       indeterminate={checked[0] !== checked[1]}
//                       onChange={handleChange1}
//                     />
//                   }
//                 />
//               </Grid>
//               <Grid item>Others</Grid>
//             </Grid>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Grid container direction="column" spacing={1}>
//               {item.details.map((child, idx) => (
//                 <Grid item>
//                   <FormControlLabel
//                     label={}
//                     control={
//                       <Checkbox
//                         checked={checked[0] && checked[1]}
//                         indeterminate={checked[0] !== checked[1]}
//                         onChange={handleChange1}
//                       />
//                     }
//                   />
//                 </Grid>
//               ))}
//             </Grid>
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </>
//   );
// }

import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

export type HierarchyCheckboxDataType = {
  id: number;
  label: string;
  children: HierarchyCheckboxDataType[];
};

export type HierarchyCheckboxProps = {
  data: HierarchyCheckboxDataType;
};
export default function HierarchyCheckbox(props: HierarchyCheckboxProps) {
  return (
    <TreeView
      aria-label="multi-select"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
      sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
        <TreeItem nodeId="3" label="Chrome" />
        <TreeItem nodeId="4" label="Webstorm" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="6" label="MUI">
          <TreeItem nodeId="7" label="src">
            <TreeItem nodeId="8" label="index.js" />
            <TreeItem nodeId="9" label="tree-view.js" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
}
