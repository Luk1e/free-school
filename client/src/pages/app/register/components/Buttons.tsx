// import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import { NavigateFunction } from "react-router-dom";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledDivButton = styled.div`
  cursor: pointer;
  text-transform: capitalize;
  text-align: center;
  min-width: 100%;
  padding: 5px 20px;
  margin-bottom: 10px;

  border: none;
  background-color: var(--magenta);

  color: white;
  font-size: var(--small-m);
  transition: all 0.4s ease 0s;

  ${respondTo.desktop`
    &:hover{
      background-color: var(--magentaWithOpacity);
      color:var(--whiteWithOpacity);
    }
  `};

  ${respondTo.tv`
    &:hover{
      background-color: var(--magentaWithOpacity);

      color:var(--whiteWithOpacity);
    }
  `};

  &:disabled {
    color: var(--whiteWithOpacity);
    background-color: var(--magentaWithOpacity);
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  min-width: 100%;
  padding: 5px 20px;
  margin-bottom: 10px;

  border: none;
  background-color: var(--magenta);

  color: white;
  font-size: var(--small-მ);
  transition: all 0.4s ease 0s;

  ${respondTo.desktop`
    &:hover{
      background-color: var(--magentaWithOpacity);
      color:var(--whiteWithOpacity);
    }
  `};

  ${respondTo.tv`
    &:hover{
      background-color: var(--magentaWithOpacity);

      color:var(--whiteWithOpacity);
    }
  `};

  &:disabled {
    color: var(--whiteWithOpacity);
    background-color: var(--magentaWithOpacity);
  }
`;

const StyledText = styled.p`
  text-align: center;
  color: var(--whiteWithOpacity);

  ${respondTo.mobile`
    color: var(--magenta);
  `}
`;

const StyledLink = styled.a`
  cursor: pointer;
  color: var(--whiteWithOpacity);
  text-transform: capitalize;
  transition: all 0.4s ease 0s;

  ${respondTo.mobile`
    color: var(--magentaWithOpacity);
  `}

  ${respondTo.smallTablet`
    color: var(--white);
  `}

  ${respondTo.desktop`
    &:hover{
      color: var(--white);
  }
`}

  ${respondTo.tv`
    &:hover{
      color:var(--white);
  }
`}
`;

interface ButtonsProps {
  navigate: NavigateFunction;
  isFirstPage: boolean;
  setIsFirstPage: () => void;
  isLoading: boolean;
  t: any;
}

function Buttons({
  navigate,
  isFirstPage,
  setIsFirstPage,
  isLoading,
  t,
}: ButtonsProps) {
  return (
    <ButtonContainer>
      {isFirstPage ? (
        <StyledDivButton onClick={() => setIsFirstPage()}>
          {t("global.next")}
        </StyledDivButton>
      ) : (
        <StyledButton type="submit" disabled={isLoading}>
          {t("global.register")}
        </StyledButton>
      )}
      <StyledText>
        {t("registerPage.Already have an account?")}{" "}
        <StyledLink onClick={() => navigate("/login")}>
          {t("global.log in")}
        </StyledLink>
      </StyledText>
    </ButtonContainer>
  );
}

export default Buttons;
