import * as yup from "yup";

export const basicSchema = yup.object().shape({
  name: yup.string("Please enter a name for you feature").required("Required"),
  start: yup.date("Please enter a valid start date").required("Required"),
  end: yup
    .date("Please enter a valid end date")
    .required("Required")
    .min(yup.ref("start"), "End date must be after start date"),
});
