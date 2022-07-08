import { Add, AddOutlined } from "@mui/icons-material";
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

export default function MyTable(props) {
  const addActionRef = useRef();
  const [column, setColumn] = useState([{}]);
  useEffect(() => {
    setColumn(props.column);
  }, [props.column]);

  return (
    <MaterialTable
      editable={{
        onRowAdd: (newData) => {
          console.log(newData);
          alert("IN may table");
        },
      }}
      title={props.title ? props.title : ""}
      {...props}
      style={{ width: "100%", ...props.style }}
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
      icons={{
        Add: (props) => (
          <Button
            variant="contained"
            startIcon={<AddOutlined />}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            Create Batch
          </Button>
        ),
      }}
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
