import { replace } from "formik";

export const MinimiseOverlappingTasks = (values) => {
  console.log(values);
  // console.log(JSON.stringify(values, replacer));
  fetch("http://localhost:5000/api/minimize-overlapping-tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data != null) {
        // console.log(data);
      }
    });
};
