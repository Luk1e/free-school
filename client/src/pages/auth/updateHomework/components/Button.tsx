// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import { useTranslation } from "react-i18next";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  cursor: pointer;
  min-width: 100%;
  padding: 5px 20px;
  margin-bottom: 10px;

  border: none;
  color: white;
  font-size: var(--small-m);
  transition: all 0.4s ease 0s;
  background-color: var(--magenta);

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

interface ButtonsProps {
  isLoading: boolean;
}

function Button({ isLoading }: ButtonsProps) {
  const { t } = useTranslation("auth");
  return (
    <ButtonContainer>
      <StyledButton type="submit" disabled={isLoading}>
        {t("global.submit")}
      </StyledButton>
    </ButtonContainer>
  );
}

export default Button;
