
export const GetGithubDetails = (values) => {
return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/api/GitubDetails", {
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