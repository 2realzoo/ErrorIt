import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import Button from "./Header/Button";

function RefreshToken() {
  // const [cookies, setCookies, removeCookies] = useCookies(["refreshToken"]);
  // setCookies("refreshToken",, { "httpOnly": true })
  const handleClick = () => {
    axios
      .post(`api/auth/refresh/members/${sessionStorage.getItem("memberId")}`, {
        headers: { "ngrok-skip-browser-warning": "12" },
      })
      .then((res) => console.log(res, sessionStorage.getItem("memberId")));
  };

  return <Button onClick={handleClick}></Button>;
}

export default RefreshToken;
