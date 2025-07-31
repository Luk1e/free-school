import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../../../store/store";
import { logout } from "../../../../toolkit/auth/authSlice";

const Container = styled.div`
  bottom: 0;
  right: 0;
  min-width: max-content;
  position: absolute;
  min-width: 100px;
  transform: translateY(calc(100% + 25px));
`;

const InnerContainer = styled.div`
  display: flex;
  padding: 5px 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  flex-direction: column;
  background-color: var(--secondary);
`;

interface LinkProps {
  $logout?: boolean;
}

const Link = styled.a<LinkProps>`
  margin: 5px 10px;

  text-align: center;
  color: var(--white);
  text-decoration: none;
  text-transform: capitalize;
  transition: all 0.4s ease 0s;

  ${(props) => props.$logout && "border-top:1px solid white;padding-top:10px;"}

  &:hover {
    color: var(--whiteWithOpacity);
  }
`;

function TopBar({ t }: any) {
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();

  return (
    <Container>
      <InnerContainer className="w3-animate-right">
        <Link onClick={() => navigate("/classroom")}>
          {t("global.classroom")}
        </Link>

        <Link
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
          $logout
        >
          {t("header.logout")}
        </Link>
      </InnerContainer>
    </Container>
  );
}

export default TopBar;
