import * as P from "./mypageStyle";
import { Link } from "react-router-dom";
import axios from "axios";
import Refresh from "../../util/Refresh";

const MypagePost = ({ post, type }) => {
  const deleteReq = async (end) => {
    const axiosReq = () => {
      return axios
        .delete(end, {
          headers: {
            "ngrok-skip-browser-warning": "12",
            Authorization: localStorage.getItem("jwtToken"),
          },
        })
        .then((res) => res)
        .catch((err) => err);
    };
    let result = await axiosReq();
    while (result.response && result.response.data.status === 401) {
      await Refresh();
      result = await axiosReq();
    }
    return result.data;
  };
  const deletePost = () => {
    const endpoint = type === "questions" ? `/api/questions/${post.questionId}` : `/api/answers/${post.answerId}`;
    deleteReq(endpoint)
      .then((res) => {
        console.log(res);
        window.location.replace("/mypage");
      })
      .catch((err) => console.log(err));
  };

  return (
    <P.PostContainer>
      {post.viewCount ? <p>viewCount : {post.viewCount}</p> : <></>}
      <Link to={`/question`} state={{ questionId: post.questionId }}>
        {post.title ? <h3>{post.title}</h3> : <h3>{post.content}</h3>}
      </Link>
      <P.DeleteBnt onClick={deletePost}>Delete</P.DeleteBnt>
      <P.TagContainer>
        <P.Tag>JAVA</P.Tag>
        <P.Tag>Javascript</P.Tag>
      </P.TagContainer>
      <p className="date">{post.createdAt.split("T")[0]}</p>
    </P.PostContainer>
  );
};

export default MypagePost;
