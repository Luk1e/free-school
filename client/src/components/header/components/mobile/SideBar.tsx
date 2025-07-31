import styled from "styled-components";
import { CloseSVG } from "../../../../static/svg/CloseSVG";
import { useNavigate } from "react-router-dom";
import { AuthUserProps } from "../../../../toolkit/auth/authSlice";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../../../store/store";
import { logout } from "../../../../toolkit/auth/authSlice";
import Translate from "./Translate";

// styles
const Container = styled.div`
  top: 0;
  right: 0;
  height: 100vh;
  position: fixed;

  display: flex;
  justify-content: center;

  background-color: var(--secondary);
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  min-width: 150px;
  margin-left: 20px;
  padding: 0 10px;

  svg {
    height: 40px !important;
    display: flex;

    left: 10px;
    margin-top: 20px;
    position: relative;

    & * {
      stroke: var(--whiteWithOpacity);
    }
  }
`;

interface LinkProps {
  $logout?: boolean;
}

const Link = styled.a<LinkProps>`
  margin: 10px 0 10px 0;

  color: var(--white);
  text-decoration: none;
  text-transform: capitalize;

  ${(props) => props.$logout && "border-top:1px solid white;padding-top:10px;"}
`;

const LinkContainer = styled.div`
  display: flex;
  color: var(--white);
  align-items: center;

  a {
    margin: 10px;
  }
`;

interface SidebarProps {
  toggle: () => void;
  user: AuthUserProps;
  t: any;
  i18n: any;
}

export const SideBar = ({ toggle, user, t, i18n }: SidebarProps) => {
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();

  const changePage = (url: string) => {
    navigate(url);
    toggle();
  };
  return (
    <Container className="w3-animate-right">
      <InnerContainer>
        <CloseSVG toggle={toggle} />

        {user ? (
          <>
            <Link onClick={() => changePage("/classroom")}>
              {t("global.classroom")}
            </Link>

            <Link
              onClick={() => {
                dispatch(logout());
                changePage("");
              }}
              $logout
            >
              {t("header.logout")}
            </Link>
          </>
        ) : (
          <LinkContainer>
            <Link onClick={() => changePage("login")}>
              {t("header.log in")}
            </Link>{" "}
            |
            <Link onClick={() => changePage("register")}>
              {t("header.register")}
            </Link>
          </LinkContainer>
        )}
        <Translate i18n={i18n} />
      </InnerContainer>
    </Container>
  );
};
