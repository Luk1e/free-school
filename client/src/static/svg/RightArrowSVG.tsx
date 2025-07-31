import styled from "styled-components";

const SVG = styled.svg`
  height: 25px;
  width: 25px;
`;

const RightArrowSVG = () => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </SVG>
  );
};

export default RightArrowSVG;
