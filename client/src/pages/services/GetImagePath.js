// export const GetImagePath = (values) => {
//     console.log(values);
//     console.log("fetching image");
//     fetch("http://localhost:5000/api/getImagePath", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     })
//     .then((data) => {
//         resolve(data);
//       })
//       .then((data) => {
//         if (data != null) {
//         }
//       });
//   };

export const GetImagePath = (values) => {
return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/api/getImagePath", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    })
    .then((response) => {
        if (response.ok) {
        return response.json();
        } else {
        throw new Error("Unable to fetch data from API");
        }
    })
    .then((data) => {
        // console.log(data);
        resolve(data);
    })
    .catch((error) => {
        console.error(error);
        reject(error);
    });
});
};