import styled from "styled-components";
import { useState } from "react";
import useWindowDimensions from "../../../utils/hooks/useWindowDimensions";
import { MenuSVG } from "../../../static/svg/MenuSVG";
import PanelSVG from "../../../static/svg/PanelSVG";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateType } from "../../../store/store";
import { SideBar } from "./mobile/SideBar";
import TopBar from "./mobile/TopBar";
import { useTranslation } from "react-i18next";
import Translate from "./desktop/Translate";
import Notification from "./Notification";

// styles
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-left: auto;
`;

const InnerContainer = styled.div`
  display: flex;
  color: var(--white);
  align-items: center;
`;

const UserTextContainer = styled.div`
  cursor: pointer;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  transition: all 0.4s ease 0s;

  svg {
    transition: all 0.4s ease 0s;
    stroke: var(--white);
    margin-left: 10px;
  }

  &:hover {
    color: var(--whiteWithOpacity);
    svg {
      stroke: var(--whiteWithOpacity);
    }
  }
`;

const UserText = styled.h2`
  font-size: var(--small-l);
  font-weight: normal;
`;

const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  text-transform: capitalize;

  color: var(--white);
  padding: 0 5px 0 5px;
  transition: color 0.4s ease 0s;

  z-index: 100;
  &:hover {
    color: var(--whiteWithOpacity);
  }
`;

// export menu
export const Menu = () => {
  // get window dimensions
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const authSlice = useSelector((state: StateType) => state.authentication);
  const { t, i18n } = useTranslation(["components"]);
  const { user } = authSlice;

  // hook for opening & closing sidebar
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);
  // hook for opening & closing topbar
  const [isOpenTopBar, setIsOpenTopBar] = useState<boolean>(false);

  return (
    <Container>
      {/* If width is more than 800px show  */}
      {width > 800 ? (
        <InnerContainer>
          {user ? (
            <>
              <UserTextContainer onClick={() => setIsOpenTopBar(!isOpenTopBar)}>
                <UserText> {user.firstName + " " + user.lastName}</UserText>
                <PanelSVG />
                {isOpenTopBar && <TopBar t={t} />}
              </UserTextContainer>
              <Notification />
            </>
          ) : (
            <>
              <Link onClick={() => navigate("/login")}>
                {t("header.log in")}
              </Link>
              |
              <Link onClick={() => navigate("/register")}>
                {t("header.register")}
              </Link>
            </>
          )}
          <Translate i18n={i18n} />
        </InnerContainer>
      ) : (
        <>
          {user && <Notification />}
          <MenuSVG toggle={() => setIsOpenSideBar(!isOpenSideBar)} />
          {isOpenSideBar && (
            <SideBar
              toggle={() => setIsOpenSideBar(!isOpenSideBar)}
              user={user}
              t={t}
              i18n={i18n}
            />
          )}
        </>
      )}
    </Container>
  );
};
