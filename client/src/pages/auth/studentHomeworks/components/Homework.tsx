import styled from "styled-components";
import { StudentHomeworkType } from "../../../../toolkit/homework/getSlice";
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

const SubmittedNumber = styled.h4`
  display: flex;
  margin: 0;
  padding: 5px 10px;
  margin-right: 20px;
  margin-left: auto;

  border-radius: 0;
  font-size: var(--small-s);
  text-transform: capitalize;
  background-color: var(--primary);
  transition: all 0.4s ease 0s;
`;

interface HomeworkProps {
  classroomId: string | undefined;
  homeworkId: string | undefined;
  homework: StudentHomeworkType;
  totalGrade: number;
  key: number;
}

function Homework({
  classroomId,
  homeworkId,
  homework,
  totalGrade,
}: HomeworkProps) {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() =>
        navigate(
          `/classroom/${classroomId}/homework/${homeworkId}?id=${homework.studentId}`
        )
      }
    >
      <Title>
        {homework.firstName} {homework.lastName}
      </Title>
      <SubmittedNumber>
        {homework.status == "GRADED"
          ? homework.grade + " / " + totalGrade
          : homework.status}
      </SubmittedNumber>
    </Container>
  );
}

export default Homework;
