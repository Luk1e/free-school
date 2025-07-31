import styled from "styled-components";

const SVG = styled.svg`
  height: fit-content !important;
  height: 24px;
  width: 24px;
`;

const PanelSVG = () => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      className="header-user-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </SVG>
  );
};

export default PanelSVG;
