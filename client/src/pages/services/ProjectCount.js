import { replace } from "formik";

export const ActiveProjects = (values) => {
  console.log(values);
  // console.log(JSON.stringify(values, replacer));
  fetch("http://localhost:5000/api/activeProjects  ", {
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
        return data;
      }
    });
};
