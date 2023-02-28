import axios from "axios";

const axiosCall = (url, method, data = null) => {
  return axios({
    method,
    url,
    data,
    headers: {
      "ngrok-skip-browser-warning": "12",
      Authorization: localStorage.getItem("jwtToken"),
    },
  })
    .then((res) => res)
    .catch((err) => err);
};

export default axiosCall;
