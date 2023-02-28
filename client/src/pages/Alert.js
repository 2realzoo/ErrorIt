import { useParams } from "react-router-dom";
import Container from "./commons/Container";
import AlertPage from "../components/AlertPage";
import Redirect from "../util/Redirect";

const Alert = () => {
  const params = useParams();
  if (params.type === "change") {
    Redirect("changePassword");
    sessionStorage.removeItem("changePassword");
  } else if (params.type === "signup") {
    Redirect("signUp");
    sessionStorage.removeItem("signUpComplete");
  }

  const signup = {
    title: "Member registration completed",
    content: ["You have completed your membership.", "Please log in."],
  };
  const change = {
    title: "Password change complete",
    content: [
      "Password change is complete.",
      "Please log in with a new password.",
    ],
  };
  return (
    <Container pageName="AlertChange">
      {params.type === "change" ? (
        <AlertPage title={change.title} content={change.content} />
      ) : (
        <AlertPage title={signup.title} content={signup.content} />
      )}
    </Container>
  );
};

export default Alert;
