import Swal from "sweetalert2";

export const getData = (api, cb) => {
  console.log(api);
  fetch(api)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to Fetch !!");
      }
      return response.json();
    })
    .then((result) => {
      cb(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDataPrivate = (api, cb, token) => {
  console.log(api);
  fetch(api, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((result) => {
      if (!result.ok) {
        throw new Error("Failed to Fetch !!");
      }
      return result.json();
    })
    .then((result) => {
      cb(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteHandlerPrivate = (api, cb, token) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.value) {
      fetch(api, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Deleting a post failed!");
          }
          return res.json();
        })
        .then((result) => {
          cb(result);
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `Data Deleted !!`,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          return Swal.fire({
            icon: "error",
            title: "Error!",
            text: `${err?.message || "Failed!!"}`,
            showConfirmButton: true,
          });
        });
    }
  });
};
