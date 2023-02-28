import React from "react";
import { useNavigate } from "react-router-dom";

function Redirect(state) {
  const navigate = useNavigate();
  switch (state) {
    case "login":
      if (sessionStorage.getItem("memberId")) {
        navigate("/");
      }
      break;
    case "checkUser":
      if (!sessionStorage.getItem("checkedUser")) {
        navigate("/");
      }
      break;
    case "signUp":
      if (!sessionStorage.getItem("signUpComplete")) {
        navigate("/");
      }
      break;
    case "changePassword":
      if (!sessionStorage.getItem("changePassword")) {
        navigate("/");
      }
      break;
    default:
      return;
  }
}

export default Redirect;
