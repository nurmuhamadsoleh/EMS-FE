import axios from "axios";

export const login = async () => {
  await axios({
    url: `http://localhost:5000/auth/login`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    data: {},
  })
    .then((res) => {
      console.log("res", res);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
