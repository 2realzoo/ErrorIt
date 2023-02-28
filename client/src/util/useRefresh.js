import axios from "axios";
import React from "react";

function useRefresh() {
  axios.defaults.withCredentials = true;
  const handleClick = () => {
    axios
      .post(`/api/auth/refresh/members/${sessionStorage.getItem("memberId")}`, {
        headers: { "ngrok-skip-browser-warning": "12" },
      })
      .then((res) => {});
  };
}

export default useRefresh;
