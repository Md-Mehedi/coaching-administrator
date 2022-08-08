import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SaveDeleteCancelButtons from "../../components/save-cancel-buttons";
import TextEditor from "../../components/text-editor";
import MaterialTable from "material-table";
import { exams, examTypes, teachers } from "../../data";
import { AddCircleOutline } from "@mui/icons-material";
import { moment } from "../../App";
import AdminLayout from "../../layouts/admin-layout";
import Events from "../class-time/events";
import { ADMIN_LINKS } from "../../links";
import { useNavigate } from "react-router-dom";

// export function Exam() {
//   const exam = exams[0];
//   return (
//     <AdminLayout>
//       <Grid container direction="column" spacing={2}>
//         <Grid item>
//           <Typography variant="subtitle1">{`Exam name : ${exam.name}`}</Typography>
//         </Grid>
//         <Grid item>
//           <Typography variant="subtitle1">{`Syllabus : ${exam.syllabus}`}</Typography>
//         </Grid>
//         <Grid item>
//           <Typography variant="subtitle1">
//             {`Mark distribution : `}
//             {exam.mark.map((item, index) => (
//               <>
//                 {" "}
//                 {index != 0
//                   ? ", "
//                   : ""} {`${item.examType} (${item.mark})`}{" "}
//               </>
//             ))}
//           </Typography>
//         </Grid>
//         <Grid item container direction="row" spacing={2}>
//           <Grid item>
//             <Button variant="contained">Update</Button>
//           </Grid>
//           <Grid item>
//             <Button variant="contained">Routine</Button>
//           </Grid>
//           <Grid item>
//             <Button variant="contained">Upload mark / Result</Button>
//           </Grid>
//         </Grid>
//       </Grid>
//     </AdminLayout>
//   );
// }
export default function ExamList() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    examColumn: [
      { title: "Name", field: "name", editable: false },
      {
        title: "Mark Distribution",
        field: "mark",
        editable: false,
        render: (item) =>
          item.mark.map((i) => (
            <Typography>{`${i.examType} : ${i.mark}`}</Typography>
          )),
      },
      {
        title: "Result Date",
        field: "resultDate",
        editable: false,
        render: (item) => <>{moment(item.resultDate).format("d MMMM, YYYY")}</>,
      },
    ],
  });
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="center">
        <Button variant="contained" startIcon={<AddCircleOutline />}>
          Add New Exam
        </Button>
      </Grid>
      <Grid item container>
        <MaterialTable
          style={{ width: "100%" }}
          //@ts-ignore
          columns={state.examColumn.map((item) => ({
            ...item,
            align: "center",
          }))}
          title="Enrolled Students"
          data={exams}
          options={{
            paging: exams.length > 10,
            headerStyle: { textAlign: "center" },
            actionsColumnIndex: -1,
            addRowPosition: "first",
            pageSize: 10,
          }}
          onRowClick={(event) => {
            navigate(ADMIN_LINKS.exam.path);
          }}
          // actions={[
          //   {
          //     icon: "visibility",
          //     tooltip: "see teacher",
          //     onClick: (event, rowData) => {
          //       console.log(rowData);
          //       // history.push(`/profile/${rowData.username}`);
          //     },
          //   },
          // ]}
        />
      </Grid>
    </Grid>
  );
}
