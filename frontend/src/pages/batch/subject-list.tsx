import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { Subject } from "../../classes/coaching";
import MyTable, { onRowAdd, onRowUpdate } from "../../components/my-table";
import { onRowDelete } from "./../../components/my-table";
import { apiCatch, showSnackbar } from "./../../tools/helper-functions";

export default function SubjectList() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const columns = [
    { title: "ID", field: "id", editable: "never" },
    { title: "Name", field: "name", editable: "always" },
    { title: "Opening Date", field: "openingDate", editable: "never" },
    { title: "Type", field: "subjectType", editable: "always" },
  ];
  const [state, setState] = useState<{
    subjects: Subject[];
    loading: boolean;
    submitted: boolean;
  }>({
    subjects: [],
    loading: true,
    submitted: false,
  });
  useEffect(() => {
    API.subject
      .getAll()
      .then((response) => {
        console.log(response.data);
        setState({
          ...state,
          subjects: response.data,
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
      data={state.subjects}
      isLoading={state.loading}
      editable={{
        onRowAdd: onRowAdd(
          state.subjects,
          (newData) => setState({ ...state, subjects: newData, loading: true }),
          (newSubject) => {
            newSubject &&
              API.subject
                .add(newSubject)
                .then((response) => {
                  showSnackbar(enqueueSnackbar, response.data);
                  setState({ ...state, submitted: true, loading: true });
                })
                .catch((r) => apiCatch(enqueueSnackbar, r));
          }
        ),
        onRowUpdate: onRowUpdate(
          state.subjects,
          (newData) => setState({ ...state, subjects: newData, loading: true }),
          (newSubject) => {
            newSubject &&
              API.subject
                .update(newSubject)
                .then((response) => {
                  showSnackbar(enqueueSnackbar, response.data);
                  setState({ ...state, submitted: true });
                })
                .catch((r) => apiCatch(enqueueSnackbar, r));
          }
        ),
        onRowDelete: onRowDelete(
          state.subjects,
          (newData) => setState({ ...state, subjects: newData }),
          (subject) => {
            subject &&
              API.subject
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
