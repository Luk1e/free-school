// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import { NavigateFunction } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  cursor: pointer;
  min-width: 100%;
  margin-bottom: 10px;
  border: none;
  padding: 5px 20px;
  background-color: var(--magenta);

  color: white;
  font-size: var(--small-m);
  transition: all 0.4s ease 0s;

  ${respondTo.desktop`
    &:hover{
      color:var(--whiteWithOpacity);
      background-color: var(--magentaWithOpacity);
    }
  `}

  ${respondTo.tv`
    &:hover{
      color:var(--whiteWithOpacity);
      background-color: var(--magentaWithOpacity);
    }
  `}

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
  isLoading: boolean;
}

function Buttons({ navigate, isLoading }: ButtonsProps) {
  const { t } = useTranslation(["app"]);
  return (
    <ButtonContainer>
      <StyledButton type="submit" disabled={isLoading}>
        {t("global.log in")}
      </StyledButton>
      <StyledText>
        {t("loginPage.Don't have an account?")}{" "}
        <StyledLink onClick={() => navigate("/register")}>
          {t("loginPage.Create new account")}{" "}
        </StyledLink>
      </StyledText>
    </ButtonContainer>
  );
}

export default Buttons;
