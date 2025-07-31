// Import styled component
import styled from "styled-components";

// Export language
export const Language = styled.div`
  cursor: pointer;
  display: flex;
  padding: 10px 15px 5px 15px;

  color: var(--white);
  text-transform: uppercase;
  transition: all 0.1s ease-in-out;

  &:last-of-type {
    padding-bottom: 10px;
  }

  &:hover {
    color: var(--whiteWithOpacity);
  }
`;

// Export icon container
export const IconContainer = styled.div`
  display: flex;
  margin-bottom: 1px;

  svg {
    margin-right: 10px;
    height: 24px !important;
    width: 24px !important;
  }
`;
