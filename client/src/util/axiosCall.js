import axios from "axios";

const axiosCall = (url) => {
  return axios
    .get(url, {
      headers: {
        "ngrok-skip-browser-warning": "12",
        Authorization: localStorage.getItem("jwtToken"),
      },
    })
    .then((res) => res.status);
};

export default axiosCall;
