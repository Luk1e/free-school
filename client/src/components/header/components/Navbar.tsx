import styled from "styled-components";
import { respondTo } from "../../../utils/helpers/_respondTo";
import { Menu } from "./Menu";
import { useNavigate } from "react-router-dom";

/* styles */
const Container = styled.div`
  margin: 0;
  outline: 0;
  padding: 0;
  z-index: 1000;

  height: 84px;
  width: 100vw;
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--gradient-primaryWithOpacity);
  box-shadow: var(--shd, 0 0 5px rgba(0, 0, 0, 0.5));

  ${respondTo.mobile`
        height:69px;
        position:static;
    `}
  ${respondTo.smallTablet`
        height:69px;
        position:static;
    `}
`;

const InnerContainer = styled.div`
  width: 90%;

  ${respondTo.desktop`
    width: 70%;
  `}

  ${respondTo.tv`
    width: 60%;
  `}

  max-width:1600px;
  display: flex;
  align-items: center;

  svg {
    height: 12rem;
    &:hover {
      cursor: pointer;
    }
  }
`;

const HeaderText = styled.h2`
  cursor: pointer;
  font-size: var(--medium-m);
  color: var(--white);
  transition: color 0.4s ease 0s;

  &:hover {
    color: var(--whiteWithOpacity);
  }
`;

function Navbar() {
  const navigate = useNavigate();

  return (
    <Container>
      <InnerContainer>
        {/* Navigate user to home page */}
        <HeaderText onClick={() => navigate("/")}>FreeSchool</HeaderText>
        {/* Right nav bar menu */}
        <Menu />
      </InnerContainer>
    </Container>
  );
}

export default Navbar;
