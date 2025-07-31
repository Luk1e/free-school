import styled from "styled-components";
import { HomeworkType } from "../../../../toolkit/homework/getAllSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  cursor: pointer;
  display: flex;
  margin: 8px 0;
  align-items: center;

  color: var(--white);
  transition: all 0.4s ease 0s;
  background-color: var(--secondary);

  &:hover {
    background-color: var(--secondaryWithOpacity);
    & h4 {
      color: var(--whiteWithOpacity);
    }
  }
`;

const Title = styled.h4`
  margin: 0;
  padding: 10px 0px 10px 20px;

  font-size: var(--small-m);
  text-transform: capitalize;
  transition: all 0.4s ease 0s;
`;

const Text = styled.h4`
  display: flex;
  margin: 0;
  padding: 5px 10px;
  margin-right: 20px;
  margin-left: auto;

  border-radius: 0;
  font-size: var(--small-s);
  font-style: italic;

  text-transform: capitalize;
  transition: all 0.4s ease 0s;
  background-color: var(--primary);
`;

interface HomeworkProps {
  classroomId: string | undefined;
  isTeacher: boolean;
  homework: HomeworkType;
  key: string;
}
function Homework({ classroomId, isTeacher, homework }: HomeworkProps) {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() =>
        isTeacher
          ? navigate(
              `/classroom/${classroomId}/homeworks/${homework.homeworkId}`
            )
          : navigate(
              `/classroom/${classroomId}/homework/${homework.homeworkId}`
            )
      }
    >
      <Title>{homework.title}</Title>
      {isTeacher ? (
        <Text>{homework.submittedNumber + " / " + homework.studentNumber}</Text>
      ) : (
        <Text>
          {homework.status == "GRADED"
            ? homework.grade + " / " + homework.totalGrade
            : homework.status}
        </Text>
      )}
    </Container>
  );
}

export default Homework;
