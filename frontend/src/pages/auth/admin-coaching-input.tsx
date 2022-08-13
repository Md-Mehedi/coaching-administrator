import { LoadingButton } from "@mui/lab";
import { Button, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AuthLayout from "../../layouts/auth-layout";
import CoachingInformationInput from "../settings/coaching-info-input";
import AdminInfoInput from "./../settings/admin-info-input";
import { Admin } from "./../../classes/person-info";
import { Coaching } from "../../classes/coaching";
import { API } from "../../api";
import { createFormData, showSnackbar } from "../../tools/helper-functions";
import { useSnackbar } from "notistack";
import { ADMIN_LINKS } from "../../links";
import { useNavigate } from "react-router-dom";
import Loading from "./../../components/loading";
import { apiCatch } from "./../../tools/helper-functions";
import AuthService from "../../services/auth-service";

export default function AdminCoachingInput() {
  const coachingVerifier = useRef<any>();
  const adminVerifier = useRef<any>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [state, setState] = useState<{
    pageId: number;
    submitLoading: boolean;
    pageLoading: boolean;
    admin: Admin;
  }>({
    pageId: 1,
    pageLoading: true,
    submitLoading: false,
    admin: new Admin(),
  });
  useEffect(() => {
    API.admin
      .getAdmin()
      .then((response) => {
        setState({ ...state, admin: response.data, pageLoading: false });
      })
      .catch((r) => apiCatch(enqueueSnackbar, r));
  }, []);

  function handleButtonClick() {
    if (state.pageId == 1) {
      setState({ ...state, pageId: 2 });
    } else {
      if (coachingVerifier.current() && adminVerifier.current()) {
        setState({ ...state, submitLoading: true });
        console.log("submitted admin", state.admin);
        let adminImage = state.admin.person?.image;
        state.admin.person = { ...state.admin.person, image: undefined };
        let coachingImage = state.admin.person.coaching?.image;
        state.admin.person.coaching = {
          ...state.admin.person.coaching,
          image: undefined,
        };
        let formData = createFormData(state.admin, adminImage);
        formData.append("coachingImage", coachingImage || new Blob([]));
        API.admin
          .addAdmin(formData)
          .then((response) => {
            showSnackbar(enqueueSnackbar, response.data);
            state.admin.person = { ...state.admin.person, image: adminImage };
            state.admin.person.coaching = {
              ...state.admin.person.coaching,
              image: coachingImage,
            };
            AuthService.setAdmin(state.admin);
            navigate(-1);
            // navigate(ADMIN_LINKS.home.path);
          })
          .catch((r) => apiCatch(enqueueSnackbar, r));
      }
    }
  }
  return (
    <AuthLayout>
      <Loading loading={state.pageLoading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            {state.pageId == 1 ? (
              <AdminInfoInput
                admin={state.admin}
                onChange={(newAdmin) =>
                  setState({
                    ...state,
                    admin: newAdmin,
                  })
                }
                verifier={adminVerifier}
              />
            ) : (
              <CoachingInformationInput
                coaching={state.admin.person?.coaching || new Coaching()}
                verifier={coachingVerifier}
                onChange={(newCoaching) => {
                  setState({
                    ...state,
                    admin: {
                      ...state.admin,
                      person: {
                        ...state.admin.person,
                        coaching: newCoaching,
                      },
                    },
                  });
                }}
              />
            )}
          </Grid>
          <Grid item container justifyContent="space-between">
            <Grid item>
              {state.pageId == 2 && (
                <Button
                  variant="contained"
                  onClick={(event) => setState({ ...state, pageId: 1 })}
                >
                  Back
                </Button>
              )}
            </Grid>
            <Grid item>
              <LoadingButton
                loading={state.submitLoading}
                variant="contained"
                onClick={handleButtonClick}
              >
                {state.pageId == 1 ? "Next" : "Submit"}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Loading>
    </AuthLayout>
  );
}
