export const AddRisk = (values) => {
  console.log(values);
  fetch("http://localhost:5000/api/addRisk", {
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
      }
    });
};
