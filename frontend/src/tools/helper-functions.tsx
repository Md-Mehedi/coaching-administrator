import { OptionsObject } from "notistack";
import { CardContent } from "@mui/material";

export function generateVariant(success: boolean): OptionsObject {
  return { variant: success ? "success" : "error" };
}

export function showSnackbar(enqueueSnackbar, data, onSuccess = () => {}) {
  data.message &&
    enqueueSnackbar(data.message, {
      variant: data.success ? "success" : "error",
    });
  data.success && onSuccess();
}

export function emptyFieldChecking(
  enqueueSnackbar,
  data: { label: string; field: any }[]
) {
  let success = true;
  data.map((item) => {
    if (!item.field) {
      success = false;
      enqueueSnackbar(`${item.label} can't be empty`, { variant: "error" });
    }
  });
  return success;
}

export function updateArray<T>(array: T[], idx: number, newValue: T) {
  let newArray = [...array];
  newArray[idx] = newValue;
  return newArray;
}

export function apiCatch(onRejected, enqueueSnackbar) {
  console.log("In axios catch", onRejected);
  let message = "";
  switch (onRejected.response.status) {
    case 0:
      message = "Server is not running";
      break;
    case 404:
      message = `API not found.`;
      break;
    case 500:
      message = `Server error`;
      break;
    default:
      message = `Unknown error`;
  }
  enqueueSnackbar(
    `${onRejected.response.status} : ${onRejected.code} : ${message}`,
    { variant: "error" }
  );
}
