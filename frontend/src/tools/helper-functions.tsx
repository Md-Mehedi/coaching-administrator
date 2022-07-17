import { OptionsObject } from "notistack";

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

export function errorVerify(
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
