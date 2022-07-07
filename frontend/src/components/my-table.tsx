import { Grid, Avatar } from "@mui/material";
import MaterialTable, { MaterialTableProps } from "material-table";
import React, { useEffect, useState } from "react";
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
export default function MyTable(props) {
  const [column, setColumn] = useState([{}]);
  useEffect(() => {
    setColumn(props.column);
  }, [props.column]);

  return (
    <MaterialTable
      {...props}
      title={props.title ? props.title : ""}
      style={{ width: "100%" }}
      //@ts-ignore
      columns={column.map((item) => ({
        align: "center",
        editable: true,
        ...item,
      }))}
      options={{
        paging: props.data.length > 10,
        headerStyle: { textAlign: "center" },
        actionsColumnIndex: -1,
        addRowPosition: "first",
        pageSize: 10,
        ...props.options,
      }}
      editable={{
        onRowAdd: (newData) => {
          console.log(newData);
        },
      }}
      // components={{
      //   Cell: <p />,
      // }}
    />
  );
}
