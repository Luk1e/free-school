import { useState, useEffect } from "react";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import styled, { css, keyframes } from "styled-components";
import classroom from "../../../../static/images/classroom.png";
import { useTranslation } from "react-i18next";

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemInnerContainer = styled.div`
  padding: 10px;
  cursor: pointer;

  box-shadow: rgba(240, 46, 170, 0.4) -5px 5px,
    rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px,
    rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px;

  border: 5px solid var(--primary);
  background-color: var(--primary);

  transition: all 0.4s ease 0s;

  &:hover {
    background-color: var(--magenta);
    border-color: var(--magenta);
  }
`;

/* animations */
// Slide in animation changing opacity from 0 to 1
const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Slide out animation changing opacity from 1 to 0
const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(20px);
    opacity: 0;
  }
`;

/* props */
// Text properties for styled component:
// Boolean animate to run either slide in or slide out
// Boolean showAnimation to not run animation on initial render
interface TextProps {
  $animate: boolean;
  $showAnimation: boolean;
}

// Styled text, initially not visible (opacity is 0) for large devices
const Text = styled.h1<TextProps>`
  margin: 10px 0;
  cursor: pointer;

  opacity: 0;
  color: var(--primary);
  font-size: var(--medium-l);
  text-transform: capitalize;

  ${respondTo.tablet`
      opacity: 1;
    `}

  ${respondTo.smallTablet`
      opacity: 1;
    `}
  
    ${respondTo.mobile`
      opacity: 1;
    `}
  
    ${(props) =>
    props.$showAnimation &&
    (props.$animate
      ? css`
          opacity: 0;
          animation: ${slideIn} 0.3s ease-in-out forwards;
        `
      : css`
          animation: ${slideOut} 0.3s ease-in-out forwards;
        `)}
`;

const Image = styled.img`
  height: 200px;
`;

interface ClassroomProps {
  width: number;
  navigate: (url: string) => void;
}

function Classroom({ width, navigate }: ClassroomProps) {
  // Initial animation and animation boolean for classroom component
  const [isHoveredClassroom, setIsHoveredClassroom] = useState(false);
  const [showAnimationClassroom, setShowAnimationClassroom] = useState(false);
  const { t } = useTranslation(["app"]);
  /* use Effects to control initial render animations */
  useEffect(() => {
    // Set showAnimationClassroom true only if it is not initial render
    if (isHoveredClassroom && !showAnimationClassroom)
      setShowAnimationClassroom(true);
  }, [isHoveredClassroom, showAnimationClassroom]);

  /* mouse hover event listener function */
  const handleMouseEnterOnClassroom = () => {
    setIsHoveredClassroom(true);
  };

  const handleMouseLeaveOnClassroom = () => {
    setIsHoveredClassroom(false);
  };

  return (
    <ItemContainer>
      <Text
        $animate={isHoveredClassroom}
        $showAnimation={width > 1024 && showAnimationClassroom}
      >
        {t("homePage.classroom")}
      </Text>
      <ItemInnerContainer
        onClick={() => navigate("/classroom")}
        onMouseEnter={handleMouseEnterOnClassroom}
        onMouseLeave={handleMouseLeaveOnClassroom}
      >
        <Image src={classroom} />
      </ItemInnerContainer>
    </ItemContainer>
  );
}

export default Classroom;
