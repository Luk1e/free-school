import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { DispatchType, StateType } from "../../../store/store";
import { respondTo } from "../../../utils/helpers/_respondTo";
import { Loader } from "../../../components";
import { useEffect } from "react";
import { getStudents, reset } from "../../../toolkit/classroom/studentSlice";
import { useParams } from "react-router-dom";
import { StudentContainer } from "./components";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 90%;
  display: flex;
  margin: 10vh 0;
  max-width: 1400px;
  flex-direction: column;
  flex-grow: 1;

  ${respondTo.mobile`
    margin: 5vh 0;
  `}

  ${respondTo.tablet`
    width: 80%;
  `};

  ${respondTo.laptop`
    width: 80%;
  `};

  ${respondTo.desktop`
    width: 70%;
  `}

  ${respondTo.tv`
    width: 60%;
  `}
`;

const InnerContainer = styled.div``;

const Label = styled.p`
  font-weight: 500;
  font-style: italic;
  color: var(--black);
  font-size: var(--small-l);
`;

const ErrorText = styled.p`
  margin: 20px 10px;
  font-style: italic;
  color: var(--primary);
  font-size: var(--small-m);
`;

function StudentsPage() {
  const { id } = useParams();
  const dispatch: DispatchType = useDispatch();
  const { t } = useTranslation(["auth"]);

  const { isLoading, studentList, success } = useSelector(
    (state: StateType) => state.students
  );

  const pendingStudentList =
    studentList && studentList?.length > 0
      ? studentList?.filter((student) => student.status === "PENDING")
      : [];

  const enrolledStudentList =
    studentList && studentList?.length > 0
      ? studentList?.filter((student) => student.status === "APPROVED")
      : [];

  useEffect(() => {
    if (!success) {
      dispatch(getStudents({ id }));
    }
    return () => {
      dispatch(reset());
    };
  }, [success]);

  return (
    <Container>
      {isLoading ? (
        <Loader color={"darkmagenta"} />
      ) : (
        <InnerContainer className="w3-animate-left">
          <Label> {t("studentsPage.Pending")}</Label>
          {pendingStudentList.length > 0 ? (
            pendingStudentList.map((student) => (
              <StudentContainer
                student={student}
                classroomId={id}
                key={student.userId}
              />
            ))
          ) : (
            <ErrorText>
              {t("studentsPage.There are no pending requests")}
            </ErrorText>
          )}

          <Label>{t("studentsPage.Enrolled")}</Label>
          {enrolledStudentList.length > 0 ? (
            enrolledStudentList.map((student) => (
              <StudentContainer
                student={student}
                classroomId={id}
                key={student.userId}
              />
            ))
          ) : (
            <ErrorText>
              {t(
                "studentsPage.There are no students enrolled in this classroom"
              )}
            </ErrorText>
          )}
        </InnerContainer>
      )}
    </Container>
  );
}

export default StudentsPage;
