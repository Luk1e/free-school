import styled from "styled-components";

const SVG = styled.svg`
  height: 24px;
  width: 24px;
`;

const ErrorSVG = () => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="white"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />{" "}
    </SVG>
  );
};

export default ErrorSVG;
