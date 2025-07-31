import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";

interface ContainerProps {
  $color: string;
}

const Container = styled.div<ContainerProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 400px;

  padding: 0px 30px;
  background-color: ${(props) => props.$color};
  box-shadow: rgba(240, 46, 170, 0.4) -5px 5px,
    rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px,
    rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px;
  transition: all 0.4s ease 0s;

  &:hover {
    opacity: 0.8;
    h3 {
      color: var(--whiteWithOpacity);
    }
  }

  ${respondTo.smallTablet`
    max-width: 500px;
  `}

  ${respondTo.desktop`
    max-width: 500px;
  `}

  ${respondTo.tv`
    max-width: 500px;
  `}
`;

const StyledName = styled.h3`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-weight: 500;
  color: var(--white);
  font-size: var(--small-l);
  transition: all 0.4s ease 0s;
`;

// Array of colors
const colors = [
  "#c0392b",
  "#e74c3c",
  "#9b59b6",
  "#8e44ad",
  "#2980b9",
  "#3498db",
  "#1abc9c",
  "#16a085",
  "#27ae60",
  "#2ecc71",
  "#f1c40f",
  "#e67e22",
  "#d35400",
  "#95a5a6",
  "#7f8c8d",
];

interface ClassroomProps {
  id: number;
  name: string;
}

function Classroom({ id, name }: ClassroomProps) {
  const navigate = useNavigate();
  // Function to generate a random index
  function getRandomIndex(max: number) {
    return Math.floor(Math.random() * max);
  }

  // Generate a random color
  const randomColor = colors[getRandomIndex(colors.length)];

  return (
    <Container
      $color={randomColor}
      onClick={() => navigate(`/classroom/${id}`)}
    >
      <StyledName>{name}</StyledName>
    </Container>
  );
}

export default Classroom;
