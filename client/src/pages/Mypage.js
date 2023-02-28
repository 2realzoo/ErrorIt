import styled from "styled-components";
import MypageTitle from "../components/Mypage/MypageTitle";
import Sidebar from "../components/Sidebar";
import { currentPage } from "../reducers/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MypageCategory from "../components/Mypage/MypageCategory";
import MypageList from "../components/Mypage/MypageList";
import MypageSetting from "../components/Mypage/MypageSetting";
import axios from "axios";
import Refresh from "../util/Refresh";

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
  const userId = sessionStorage.getItem("memberId");
  const [userInfo, setUserInfo] = useState({});

  const getUser = async () => {
    const axiosGet = () => {
      return axios({
        method: "GET",
        url: `/api/members/${userId}`,
        headers: {
          "ngrok-skip-browser-warning": "12",
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
        .then((res) => res)
        .catch((err) => err);
    };
    let result = await axiosGet();
    while (result.response && result.response.data.status === 401) {
      await Refresh();
      result = await axiosGet();
    }
    return result.data;
  };

  useEffect(() => {
    dispatch(currentPage("Users"));
    getUser().then((res) => setUserInfo(res));
  }, []);

  return (
    <MyComponent>
      <Sidebar />
      <PageContainer>
        <MypageTitle userInfo={userInfo} />
        <MypageCategory />
        {mypageReducer === "Questions" ? <MypageList title="Questions" type="questions" userInfo={userInfo} /> : <></>}
        {mypageReducer === "Answers" ? <MypageList title="Answers" type="answers" userInfo={userInfo} /> : <></>}
        {mypageReducer === "Edit" ? <MypageSetting userInfo={userInfo} /> : <></>}
      </PageContainer>
    </MyComponent>
  );
};

export default Mypage;
