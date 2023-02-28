import * as P from "./mypageStyle";

const MypagePost = ({ post }) => {
  return (
    <P.PostContainer>
      {post.viewCount ? <p>viewCount : {post.viewCount}</p> : <></>}
      {post.title ? <h3>{post.title}</h3> : <h3>{post.content}</h3>}
      <P.TagContainer>
        <P.Tag>JAVA</P.Tag>
        <P.Tag>Javascript</P.Tag>
      </P.TagContainer>
      <p className="date">{post.createdAt.split("T")[0]}</p>
    </P.PostContainer>
  );
};

export default MypagePost;
