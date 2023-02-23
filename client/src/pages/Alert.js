import { useParams } from "react-router-dom";
import AlertPage from "../components/AlertPage";

const Alert = () => {
  const params = useParams();
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
    <div>
      {params.type === "change" ? (
        <AlertPage title={change.title} content={change.content} />
      ) : (
        <AlertPage title={signup.title} content={signup.content} />
      )}
    </div>
  );
};

export default Alert;
