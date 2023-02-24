import styled from "styled-components";
import MypageTitle from "../components/Mypage/MypageTitle";
import Sidebar from "../components/Sidebar";
import { currentPage } from "../reducers/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MypageCategory from "../components/Mypage/MypageCategory";
import MypageList from "../components/Mypage/MypageList";
import MypageSetting from "../components/Mypage/MypageSetting";

const MyComponent = styled.div`
  width: 90%;
  max-width: 1300px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: stretch;
`;
const PageContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 1.5rem;
`;

const Mypage = () => {
  const { mypageReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentPage("Users"));
  }, []);

  return (
    <MyComponent>
      <Sidebar />
      <PageContainer>
        <MypageTitle />
        <MypageCategory />
        {mypageReducer === "Questions" ? <MypageList title="Questions" type="questions" /> : <></>}
        {mypageReducer === "Answers" ? <MypageList title="Answers" type="answers" /> : <></>}
        {mypageReducer === "Edit" ? <MypageSetting /> : <></>}
      </PageContainer>
    </MyComponent>
  );
};

export default Mypage;
