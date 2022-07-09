import { Add, AddCircle, AddOutlined } from "@mui/icons-material";
import { Grid, Avatar, IconButton, Button } from "@mui/material";
import MaterialTable, {
  MaterialTableProps,
  MTableAction,
} from "material-table";
import React, { useEffect, useRef, useState } from "react";
import { students } from "../data";
export type column = {
  title: string;
  field: string;
  editable: boolean;
  render: (item) => {};
}[];

export type actions = {
  icon: string;
  tooltip: string;
  onClick: (event, rowData) => {};
};

export interface MyTableProps<RowData extends object>
  extends MaterialTableProps<RowData> {
  addButtonText?: string;
  addButtonDialog?: JSX.Element[] | JSX.Element;
}

export default function MyTable<RowData extends object>(
  props: MyTableProps<RowData>
) {
  const addActionRef = useRef();
  const { addButtonText, addButtonDialog, ...others } = props;
  const [column, setColumn] = useState([{}]);
  useEffect(() => {
    setColumn(props.columns);
  }, [props.columns]);

  return (
    //@ts-ignore
    <MaterialTable
      // editable={{
      //   // onRowAdd: (newData) => {
      //   //   console.log(newData);
      //   //   alert("IN my table");
      //   // },
      // }}
      title={props.title ? props.title : ""}
      {...others}
      style={{ width: "100%", ...props.style }}
      //@ts-ignore
      columns={column.map((item) => ({
        align: "center",
        editable: true,
        ...item,
      }))}
      options={{
        paging: props.data.length >= 5,
        headerStyle: { textAlign: "center" },
        actionsColumnIndex: 0,
        addRowPosition: "first",
        pageSize: 5,
        ...props.options,
      }}
      // icons={{
      //   Add: (addProps) => (
      //     <Button
      //       variant="contained"
      //       startIcon={<AddCircle />}
      //       onClick={(event) => {
      //         event.stopPropagation();
      //         addProps?.ref?.onClick();
      //       }}
      //     >
      //       {props.addButtonText || "Add"}
      //     </Button>
      //   ),
      // }}
      // components={{
      //   Action: (props) => {
      //     if (
      //       typeof props.action === typeof Function ||
      //       props.action.tooltip !== "Add"
      //     )
      //       return <MTableAction {...props} />;
      //     else
      //       return (
      //         //@ts-ignore
      //         <div ref={addActionRef} onClick={props.action.onClick}>
      //           ADD{" "}
      //         </div>
      //       );
      //   },
      // }}
      // components={{
      //   Cell: <p />,
      // }}
    />
  );
}
