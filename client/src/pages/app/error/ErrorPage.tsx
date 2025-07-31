// Import styles
import styled from "styled-components";
import { respondTo } from "../../../utils/helpers/_respondTo";
// Import svg array
import { svgArray } from "./svgs";
// Import hooks
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 100%;
  padding: 2rem;

  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  ${respondTo.tv`
    width:1400px;
  `}
`;

const SVG = styled.img`
  width: 100%;
  max-height: 30rem;

  ${respondTo.tv`
    max-height:40rem;
  `}
`;

const Advertisement = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;

  a {
    color: darkmagenta;
    text-decoration: none;
    font-size: var(--small-s);
  }
`;

const TextContainer = styled.div`
  margin: 1rem;
`;

const Text = styled.h1`
  display: flex;
  align-items: center;

  text-align: center;
  font-size: var(--medium-s);
`;

const Button = styled.button`
  cursor: pointer;
  width: 100%;

  border: none;
  border-radius: 20px;
  padding: 0.5rem;
  color: var(--white);
  background-color: var(--primary);
  transition: color 0.1s ease-in-out;

  text-transform: lowercase;
  &::first-letter {
    text-transform: capitalize;
  }

  ${respondTo.desktop`
    &:hover {
      color: var(--whiteWithOpacity);
    }
  `}
  ${respondTo.tv`
    &:hover {
      color: var(--whiteWithOpacity);
    }
  `}
`;

function randomNumberInRange(min: number, max: number) {
  // 👇️ get number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Export error component
function Error() {
  // Initialize hooks
  const { t } = useTranslation(["app"]);
  const navigate = useNavigate();

  // Error svg index
  const index = randomNumberInRange(0, 4);

  return (
    <Container>
      <SVG src={svgArray[index]} className="w3-animate-right" />
      <TextContainer className="w3-animate-right">
        <Text>{t("error.page not found")}</Text>
        <Button onClick={() => navigate("/")}>{t("error.back to site")}</Button>
      </TextContainer>
      <Advertisement>
        <a href="https://storyset.com/web">Web illustrations by Storyset</a>
      </Advertisement>
    </Container>
  );
}

export default Error;
