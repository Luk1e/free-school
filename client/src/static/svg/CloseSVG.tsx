interface CloseSVGProps {
  toggle: () => void;
}

export const CloseSVG: React.FC<CloseSVGProps> = ({ toggle }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => toggle()}
    >
      <g id="Menu / Close_SM">
        <path
          id="Vector"
          d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
          stroke="gray"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
