import React from "react";
import styled from "styled-components";

const DetailContainer = styled.div`

`
const QuestionMain = styled.div`
    
`;
const QuestionDetail = styled.div`

`;
const Comment = styled.div`

`;
const SideMenu = styled.div`

`;


function Detail() {
  return (
    <DetailContainer>
        <SideMenu/>
        <QuestionDetail>
        I'm trying to identify outliers in each housing type category, but
        encountering an issue. Whenever I run the code, I receive the
        following error: "IndexingError: Unalignable boolean Series provided
        as indexer (index of the boolean Series and of the indexed object do
        not match).
        </QuestionDetail>
        <Comment />
    </DetailContainer>
  );
}

export default Detail;
