// Import styled components
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";

// Dropdown component
export const DropDown = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid white;
`;

interface ItemProps {
  $left?: string;
}
// Dropdown item component
export const Item = styled.div<ItemProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  color: var(--white);
  text-transform: capitalize;
  width: 100%;
  font-size: var(--small-l);

  ${(props) => props.$left && "align-self:start;"}
  a {
    cursor: default;
    text-decoration: none;
  }
`;

// Icon container
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;

  svg {
    margin: 0 !important;
    height: 1.875rem;
    width: 1.875rem;
    ${respondTo.mobile`
      height:1.625rem;
      width:1.625rem;
    `}
  }
`;
