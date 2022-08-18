import { Add, AddCircle, AddOutlined } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import { Grid, Avatar, IconButton, Button, TextField } from "@mui/material";
import MaterialTable, {
  MaterialTableProps,
  MTableAction,
  MTableToolbar,
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
  onAddButtonClick?: (event) => void;
}

export default function MyTable<RowData extends object>(
  props: MyTableProps<RowData>
) {
  const { addButtonText, onAddButtonClick, ...others } = props;
  const [column, setColumn] = useState([{}]);
  useEffect(() => {
    setColumn(props.columns);
  }, [props.columns]);

  return (
    //@ts-ignore
    <MaterialTable
      title={props.title ? props.title : ""}
      {...others}
      style={{ width: "100%", ...props.style }}
      //@ts-ignore
      columns={column.map((item) => ({
        align: "center",
        ...item,
      }))}
      options={{
        paging: props.data.length >= 5,
        // headerStyle: { textAlign: "center" },
        actionsColumnIndex: 0,
        addRowPosition: "first",
        pageSize: 5,
        ...props.options,
      }}
      onColumnDragged={(event) => alert("hello")}
      components={{
        Toolbar: (props) => (
          <>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ paddingLeft: 2, paddingRight: 2 }}
            >
              <Grid item sx={{ flexGrow: 1 }}>
                <MTableToolbar
                  {...props}
                  sx={{ ...props.style, width: "100%" }}
                />
              </Grid>
              {onAddButtonClick && (
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<AddCircle />}
                    onClick={onAddButtonClick}
                  >
                    {addButtonText}
                  </Button>
                </Grid>
              )}
            </Grid>
          </>
        ),
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

export function onRowDelete(data, setData, func = (oldData) => {}) {
  return (oldData) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const dataDelete = [...data];
        //@ts-ignore
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData(dataDelete);
        resolve(1);
        func(oldData);
      }, 100);
    });
}
export function onRowUpdate(data, setData, func = (newData) => {}) {
  return (newData, oldData) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const dataUpdate = [...data];
        //@ts-ignore
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData(dataUpdate);
        resolve(1);
        func(newData);
      }, 100);
    });
}

export function onRowAdd(data, setData, func = (newData) => {}) {
  return (newData) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        setData([newData, ...data]);
        resolve(1);
        func(newData);
      }, 100);
    });
}

export function columnDateInput(label: string = "") {
  return (props) => (
    <DatePicker
      label={label}
      value={props.value}
      onChange={props.onChange}
      // onChange={(newValue) => {
      //   props.onChange(newValue.toLocaleString());
      // }}
      renderInput={(params) => <TextField fullWidth {...params} />}
    />
  );
}
