import * as P from "./mypageStyle";

const MypagePost = ({ post }) => {
  return (
    <P.PostContainer>
      <p>viewCount</p>
      <h3>post.title</h3>
      <P.TagContainer>
        <P.Tag>JAVA</P.Tag>
        <P.Tag>Javascript</P.Tag>
      </P.TagContainer>
      <p className="date">createAt</p>
    </P.PostContainer>
  );
};

export default MypagePost;
