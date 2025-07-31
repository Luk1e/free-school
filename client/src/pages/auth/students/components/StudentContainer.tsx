import styled from "styled-components";
import {
  acceptStudent,
  rejectStudent,
  removeStudent,
  StudentProps,
} from "../../../../toolkit/classroom/studentSlice";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../../../store/store";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
  margin: 10px 0;
  align-items: center;
  background-color: var(--magenta);

  box-shadow: rgba(240, 46, 170, 0.4) -5px 5px,
    rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px,
    rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px;

  ${respondTo.mobile`
    flex-direction: column;
    justify-content: center;
  `}

  ${respondTo.smallTablet`
    flex-direction: column;
    justify-content: center;
  `}
`;

const UserText = styled.div`
  padding: 8px 20px;
  color: var(--white);
  text-transform: capitalize;

  ${respondTo.mobile`
    box-shadow: none;
    background:transparent;
  `}

  ${respondTo.smallTablet`
    box-shadow: none;
    background:transparent;
  `}
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto;

  padding: 8px 20px;

  ${respondTo.mobile`
    margin-left: 0;
    box-shadow: none;
    background:transparent;
  `}

  ${respondTo.smallTablet`
    margin-left: 0;
    box-shadow: none;
    background:transparent;
  `}
`;
const Button = styled.button`
  cursor: pointer;
  margin: 0 10px;
  height: 100%;
  padding: 5px 20px;

  border: none;
  color: var(--white);
  font-size: var(--small-m);
  transition: all 0.4s ease 0s;

  &:first-of-type {
    background-color: green;
  }

  &:last-of-type {
    background: var(--red);
  }

  &:hover {
    opacity: 0.8;
    color: var(--whiteWithOpacity);
  }

  ${respondTo.mobile`
    background:transparent;
  `}

  ${respondTo.smallTablet`
    background:transparent;
  `}
`;

interface StudentContainerProps {
  student: StudentProps;
  classroomId: string | undefined;
  key: number;
}

function StudentContainer({ student, classroomId }: StudentContainerProps) {
  const dispatch: DispatchType = useDispatch();
  const { t } = useTranslation(["auth"]);
  return (
    <Container>
      <UserText>{student.firstName + " " + student.lastName}</UserText>
      <ButtonContainer>
        {student.status == "PENDING" ? (
          <>
            <Button
              onClick={() =>
                dispatch(
                  acceptStudent({
                    studentId: student.userId.toString(),
                    classroomId: classroomId,
                  })
                )
              }
            >
              {t("studentsPage.accept")}
            </Button>
            <Button
              onClick={() =>
                dispatch(
                  rejectStudent({
                    studentId: student.userId.toString(),
                    classroomId: classroomId,
                  })
                )
              }
            >
              {t("studentsPage.reject")}
            </Button>
          </>
        ) : (
          <Button
            onClick={() =>
              dispatch(
                removeStudent({
                  studentId: student.userId.toString(),
                  classroomId: classroomId,
                })
              )
            }
          >
            {" "}
            {t("studentsPage.remove")}
          </Button>
        )}
      </ButtonContainer>
    </Container>
  );
}

export default StudentContainer;
