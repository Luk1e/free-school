import { useNavigate } from "react-router-dom";
import { respondTo } from "../../../utils/helpers/_respondTo";
import useWindowDimensions from "../../../utils/hooks/useWindowDimensions";
import styled from "styled-components";
import Classroom from "./components/Classroom";

const Container = styled.div`
  width: 80%;
  margin: 10vh 0 20vh 0;
  max-width: 1400px;

  ${respondTo.mobile`
    padding: 50px 0;
  `}
  ${respondTo.desktop`
    width: 70%;
  `}

  ${respondTo.tv`
    width: 60%;
  `}
  display: flex;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  ${respondTo.tablet`
    flex-direction: column;
    gap:20px;
  `}

  ${respondTo.smallTablet`
    flex-direction: column;
    gap:20px;
  `}

  ${respondTo.mobile`
    flex-direction: column;
    gap:20px;
  `}
`;

function HomeScreen() {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  return (
    <Container>
      <InnerContainer className="w3-animate-left">
        <Classroom width={width} navigate={navigate} />
      </InnerContainer>
    </Container>
  );
}

export default HomeScreen;
