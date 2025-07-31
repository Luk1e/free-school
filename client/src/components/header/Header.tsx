import styled from "styled-components";
import { respondTo } from "../../utils/helpers/_respondTo";
import { Navbar } from "./components";
/* styles */
const Container = styled.div`
  margin: 0;
  outline: 0;
  padding: 0;
  height: 84px;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--gradient-primary);
  box-shadow: var(--shd, 0 0 5px rgba(0, 0, 0, 0.5));

  ${respondTo.mobile`
        height:69px;
    `}
  ${respondTo.smallTablet`
        height:69px;
    `}
`;

const InnerContainer = styled.div`
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

function Header() {
  return (
    <Container>
      <InnerContainer>
        <Navbar />
      </InnerContainer>
    </Container>
  );
}

export default Header;
