import styled from "styled-components";
interface MenuSVGProps {
  toggle: () => void;
}

const SVG = styled.svg`
  height: fit-content !important;
  height: 36px;
  width: 36px;

  path {
    stroke: var(--white);
  }
`;

export const MenuSVG: React.FC<MenuSVGProps> = ({ toggle }) => {
  return (
    <SVG
      viewBox="0 0 24 24"
      fill="rgb(244, 244, 244)"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => toggle()}
    >
      <g id="Menu / Menu_Alt_05">
        <path
          id="Vector"
          d="M5 17H13M5 12H19M11 7H19"
          stroke="rgb(244, 244, 244)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SVG>
  );
};
