import axios from "axios";

function Refresh() {
  axios.defaults.withCredentials = true;
  return axios
    .post(`/api/auth/refresh/members/${sessionStorage.getItem("memberId")}`, {
      headers: { "ngrok-skip-browser-warning": "12" },
    })
    .then((res) => {
      localStorage.setItem("jwtToken", res.headers.authorization);
    });
}

export default Refresh;
