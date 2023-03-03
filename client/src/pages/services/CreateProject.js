export const CallCreateProject = (values) => {
  console.log(values);
  fetch("http://localhost:5000/api/createProject", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      adj: Array.from(values.dependencies.entries()),
      projectid: values.projectid,
    }),
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
