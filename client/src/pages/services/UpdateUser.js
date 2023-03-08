export const UpdateUser = (values) => {
  console.log("UPDATE USER");
  console.log(values);
  fetch("http://localhost:5000/api/updateUser", {
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
