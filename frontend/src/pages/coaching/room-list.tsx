import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { Room, Subject } from "../../classes/coaching";
import MyTable, { onRowAdd, onRowUpdate } from "../../components/my-table";
import { onRowDelete } from "../../components/my-table";
import { apiCatch, showSnackbar } from "../../tools/helper-functions";

export default function RoomList() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const columns = [
    { title: "ID", field: "id", editable: "never" },
    { title: "Room name", field: "name", editable: "always" },
    { title: "Student capacity", field: "studentCapacity", editable: "always" },
  ];
  const [state, setState] = useState<{
    rooms: Room[];
    loading: boolean;
    submitted: boolean;
  }>({
    rooms: [],
    loading: true,
    submitted: false,
  });
  useEffect(() => {
    API.room
      .getAll()
      .then((response) => {
        console.log(response.data);
        setState({
          ...state,
          rooms: response.data,
          loading: false,
          submitted: false,
        });
      })
      .catch((r) => apiCatch(enqueueSnackbar, r));
  }, [state.submitted]);

  return (
    <MyTable
      // @ts-ignore
      columns={columns}
      data={state.rooms}
      isLoading={state.loading}
      editable={{
        onRowAdd: onRowAdd(
          state.rooms,
          (newData) => setState({ ...state, rooms: newData, loading: true }),
          (newRoom) => {
            newRoom &&
              API.room
                .add(newRoom)
                .then((response) => {
                  showSnackbar(enqueueSnackbar, response.data);
                  setState({ ...state, submitted: true, loading: true });
                })
                .catch((r) => apiCatch(enqueueSnackbar, r));
          }
        ),
        onRowUpdate: onRowUpdate(
          state.rooms,
          (newData) => setState({ ...state, rooms: newData, loading: true }),
          (newRoom) => {
            newRoom &&
              API.room
                .update(newRoom)
                .then((response) => {
                  showSnackbar(enqueueSnackbar, response.data);
                  setState({ ...state, submitted: true });
                })
                .catch((r) => apiCatch(enqueueSnackbar, r));
          }
        ),
        onRowDelete: onRowDelete(
          state.rooms,
          (newData) => setState({ ...state, rooms: newData }),
          (subject) => {
            subject &&
              API.room
                .delete(subject.id)
                .then((response) => {
                  showSnackbar(enqueueSnackbar, response.data);
                })
                .catch((r) => apiCatch(enqueueSnackbar, r));
          }
        ),
      }}
    />
  );
}
