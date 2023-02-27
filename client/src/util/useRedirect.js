import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("memberId")) {
      navigate("/");
    }
  });
}

export default useRedirect;
