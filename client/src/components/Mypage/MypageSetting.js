import styled from "styled-components";

const SettingContainer = styled.div`
  width: 100%;
  display: flex;
  padding-top: 20px;
`;
const SettingBar = styled.div`
  width: 20%;
  max-width: 200px;
  flex-grow: 1;
`;
const SettingComponent = styled.div`
  width: 80%;
  height: 80vh;
  flex-grow: 2;
`;
const BarMenu = styled.ul``;
const Menu = styled.li``;

const MypageSetting = () => {
  return (
    <SettingContainer>
      <SettingBar>
        <h5>PERSONAL INFORMATION</h5>
        <BarMenu>
          <Menu>Edit profile</Menu>
          <Menu>Change Passsword</Menu>
          <Menu>Delete profile</Menu>
        </BarMenu>
      </SettingBar>
      <SettingComponent></SettingComponent>
    </SettingContainer>
  );
};

export default MypageSetting;
