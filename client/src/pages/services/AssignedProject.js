export const AssignedProjects = (values) => {
  return new Promise((resolve, reject) => {
    let dependencyIds = [];
    fetch("http://localhost:5000/api/assignedProjects", {
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
          for (let i = 0; i < data.length; i++) {
            dependencyIds.push(data[i].featureid);
          }
          resolve(dependencyIds);
        } else {
          reject("Null data");
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
