// import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  cursor: pointer;
  min-width: 100%;
  padding: 5px 20px;

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

interface ButtonsProps {
  text: string;
  isLoading: boolean;
}

function Button({ text, isLoading }: ButtonsProps) {
  return (
    <ButtonContainer>
      <StyledButton type="submit" disabled={isLoading}>
        {text}
      </StyledButton>
    </ButtonContainer>
  );
}

export default Button;
